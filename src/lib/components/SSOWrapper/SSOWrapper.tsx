import { ReactNode, useEffect, useState } from 'react'
import { AuthProvider, AuthProviderProps, useAuth } from 'react-oidc-context'

import SystemPage from '../SystemPage'

export interface ISSOWrapperProps {
  children: ReactNode
}

const VITE_APP_SSO_ISSUER = import.meta.env.VITE_APP_SSO_ISSUER
const VITE_APP_SSO_CLIENT_ID = import.meta.env.VITE_APP_SSO_CLIENT_ID

const host = `${globalThis.location.protocol}//${globalThis.location.host}`

const autProps: AuthProviderProps = {
  authority: VITE_APP_SSO_ISSUER,
  client_id: VITE_APP_SSO_CLIENT_ID,
  redirect_uri: `${host}/sso-call-back`,
  response_mode: 'query',
  response_type: 'code',
  post_logout_redirect_uri: `${host}/logout`,
  scope: 'openid profile offline_access',
  silent_redirect_uri: `${host}/signing-in`,
  automaticSilentRenew: false,
}

const bc = new BroadcastChannel('app-event')

const AuthRequestSyncer = ({ onAuthChange }) => {
  const ssoAuth = useAuth()

  useEffect(() => {
    if (ssoAuth.user?.access_token) {
      onAuthChange?.(ssoAuth)
    }
  }, [ssoAuth.user?.access_token])

  useEffect(() => {
    const onUserLoaded = () => {
      bc.postMessage({ type: 'TOKEN_UPDATED' })
    }

    if (!ssoAuth.isLoading && !ssoAuth.isAuthenticated) {
      ssoAuth.signinSilent()
    }

    ssoAuth.events.addUserLoaded(onUserLoaded)

    return () => {
      ssoAuth.events.removeUserLoaded(onUserLoaded)
    }
  }, [ssoAuth])

  useEffect(() => {
    bc.onmessage = (event) => {
      if (event.data?.type === 'TOKEN_UPDATED') {
        const key = `oidc.user:${VITE_APP_SSO_ISSUER}:${VITE_APP_SSO_CLIENT_ID}`
        const raw = sessionStorage.getItem(key)
        if (raw) {
          const user = JSON.parse(raw)
          onAuthChange?.({
            ...ssoAuth,
            user,
          })
        }
      }
    }

    return () => bc.close()
  }, [])

  return null
}

const SSOWrapper = ({ children, onAuthChange }) => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const tokenUpdatedHandler = () => {
      setReady(true)
    }
    globalThis.addEventListener('token-updated', tokenUpdatedHandler)

    return () => {
      globalThis.removeEventListener('token-updated', tokenUpdatedHandler)
    }
  }, [])

  return (
    <AuthProvider {...autProps}>
      <AuthRequestSyncer onAuthChange={onAuthChange} />
      {ready ? children : <SystemPage page="loading" />}
    </AuthProvider>
  )
}

export default SSOWrapper
