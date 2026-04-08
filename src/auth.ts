import axios from 'axios'
import { deleteToken } from 'firebase/messaging'

import { ENDPOINT } from 'src/constants/api'
import { USER_ACCESS_TOKEN, USER_DEVICE_ID, USER_KEY, USER_LANGUAGE, USER_REFRESH_TOKEN } from 'src/constants/app'
import { APP_GATEWAY, TENANT_HOST_PATTERN, VITE_APP_BACKEND_IDENTITY, VITE_APP_TENANT_ID } from 'src/environments/environment'
import { messaging } from 'src/firebase'
import { queryClient } from 'src/query'
import { PATH_TREE } from 'src/router/routes'
import { getEncryptedItem, removeEncryptedItem, setEncryptedItem } from 'src/utils/storage'

export interface AuthSession {
  accessToken: string
  refreshToken: string
  deviceId: string
}

export interface AuthState {
  isBootstrapping: boolean
  accessToken: string | null
  refreshToken: string | null
  deviceId: string | null
}

interface RefreshSessionResponse {
  accessToken: string
  refreshToken: string
  deviceId: string
}

interface RefreshResponse<T> {
  statusCode?: number
  status_code?: number
  data?: T
}

const listeners = new Set<() => void>()
const logoutChannel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('app-event') : null

let authState: AuthState = {
  isBootstrapping: true,
  accessToken: null,
  refreshToken: null,
  deviceId: null,
}

let refreshPromise: Promise<AuthSession> | null = null

const emitChange = () => {
  listeners.forEach((listener) => listener())
}

const getStoredSession = (): Omit<AuthState, 'isBootstrapping'> => ({
  accessToken: getEncryptedItem(USER_ACCESS_TOKEN),
  refreshToken: getEncryptedItem(USER_REFRESH_TOKEN),
  deviceId: getEncryptedItem(USER_DEVICE_ID),
})

const setAuthState = (nextState: AuthState) => {
  authState = nextState
  emitChange()
}

const getTenantId = () => {
  const host = globalThis.location.hostname

  if (host.includes(TENANT_HOST_PATTERN) || host.includes('subcription')) {
    return host.split('.').at(-5) || VITE_APP_TENANT_ID || 'msm'
  }

  return VITE_APP_TENANT_ID || 'msm'
}

export const subscribeAuth = (listener: () => void) => {
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
  }
}

export const getAuthSnapshot = () => authState

export const bootstrapSession = () => {
  const storedSession = getStoredSession()

  setAuthState({
    isBootstrapping: false,
    ...storedSession,
  })

  return authState
}

export const setSession = (session: AuthSession) => {
  setEncryptedItem(USER_ACCESS_TOKEN, session.accessToken)
  setEncryptedItem(USER_REFRESH_TOKEN, session.refreshToken)
  setEncryptedItem(USER_DEVICE_ID, session.deviceId)

  setAuthState({
    isBootstrapping: false,
    accessToken: session.accessToken,
    refreshToken: session.refreshToken,
    deviceId: session.deviceId,
  })
}

export const clearSession = async () => {
  removeEncryptedItem(USER_ACCESS_TOKEN)
  removeEncryptedItem(USER_REFRESH_TOKEN)
  removeEncryptedItem(USER_DEVICE_ID)
  removeEncryptedItem(USER_KEY)

  sessionStorage.clear()
  queryClient.clear()
  globalThis.dispatchEvent(new Event('logout'))
  logoutChannel?.postMessage({ type: 'LOGOUT_CHANNEL' })

  try {
    if (messaging) {
      await deleteToken(messaging)
    }
  } catch (error) {
    console.error('Error deleting token:', error)
  }

  setAuthState({
    isBootstrapping: false,
    accessToken: null,
    refreshToken: null,
    deviceId: null,
  })
}

export const logout = async () => {
  const currentLang = getEncryptedItem(USER_LANGUAGE)

  await clearSession()

  if (currentLang) {
    setEncryptedItem(USER_LANGUAGE, currentLang)
  }

  globalThis.location.replace(PATH_TREE.LOGIN)
}

export const getAccessToken = () => authState.accessToken || getStoredSession().accessToken

export const refreshSession = async () => {
  if (refreshPromise) {
    return refreshPromise
  }

  const { refreshToken, deviceId } = authState.refreshToken
    ? authState
    : { ...authState, ...getStoredSession() }

  if (!refreshToken || !deviceId) {
    await clearSession()
    throw new Error('Missing refresh session')
  }

  refreshPromise = axios
    .post<RefreshResponse<RefreshSessionResponse>>(
      `${VITE_APP_BACKEND_IDENTITY}${ENDPOINT.REFRESH_TOKEN}`,
      {
        refreshToken,
        deviceId,
      },
      {
        baseURL: APP_GATEWAY,
        headers: {
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          'x-tenant-id': getTenantId(),
        },
      },
    )
    .then(({ data }) => {
      const statusCode = data.statusCode ?? data.status_code

      if (statusCode !== 200 || !data.data?.accessToken || !data.data?.refreshToken) {
        throw new Error('Refresh session failed')
      }

      setSession(data.data)
      return data.data
    })
    .catch(async (error) => {
      await clearSession()
      throw error
    })
    .finally(() => {
      refreshPromise = null
    })

  return refreshPromise
}
