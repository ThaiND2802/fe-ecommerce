import { message as antdMessage } from 'antd'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import i18n from 'i18next'

import { getAccessToken, logout, refreshSession } from 'src/auth'
import { getEncryptedItem } from '../utils/storage'

interface RetryAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean
}

const API_HOST = import.meta.env.VITE_APP_GATEWAY
const TENANT_HOST_PATTERN = import.meta.env.VITE_APP_TENANT_HOST_PATTERN
const VITE_APP_TENANT_ID = import.meta.env.VITE_APP_TENANT_ID

const Lang = {
  vi: 'vi-VN',
  en: 'en-US',
}

const host = globalThis.location.hostname
let tenantId = VITE_APP_TENANT_ID
if (host.includes(TENANT_HOST_PATTERN)) {
  tenantId = host.split('.')[0]
}

const lang = Lang[getEncryptedItem('user_language')] ?? Lang.vi
export const apiClient = axios.create({
  baseURL: API_HOST,
  timeout: 30000,
  headers: {
    'X-Frame-Options': 'DENY',
    'Content-Security-Policy': "frame-ancestors 'self';",
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    'firebase-token': getEncryptedItem('FCM_TOKEN'),
    'x-tenant-id': tenantId,
    lang,
  },
})

i18n.on('languageChanged', (lng) => {
  apiClient.defaults.headers.lang = Lang[lng]
})

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken()

  if (token && !(config as RetryAxiosRequestConfig)._retry) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryAxiosRequestConfig | undefined

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const session = await refreshSession()
        originalRequest.headers = originalRequest.headers ?? {}
        originalRequest.headers.Authorization = `Bearer ${session.accessToken}`

        return await apiClient.request(originalRequest)
      } catch (err: unknown) {
        await logout()
        return Promise.reject(err as Error) as any
      }
    }

    return Promise.reject(error as Error) as any
  },
)

interface RequestConfig extends AxiosRequestConfig {
  showError?: boolean
  commonError?: boolean
  errorMessageFirst?: boolean
}

export interface PaginationParams {
  page_index: number
  page_size: number
}

export interface ApiResponse<T> {
  status_code: number
  error_code: number
  message: string
  error_message: string
  data?: T
  pagination?: {
    page_index: number
    page_size: number
    total_page: number
    total_rows: number
  }
}

export class ApiError extends Error {
  errorCode: number
  errorMessage: string
  statusCode: number

  constructor(errorCode: number, errorMessage: string, statusCode: number) {
    super(errorMessage)
    this.errorCode = errorCode
    this.statusCode = statusCode
    Object.setPrototypeOf(this, ApiError.prototype)
  }
}

export const handleErrorCodes = (errorCode: number | string) => {
  const messageKey = `common.errorCode.${errorCode}`
  const message = i18n.t(messageKey)

  if (message === messageKey) {
    antdMessage.error(i18n.t('common.message.apiFailed'))
  } else {
    antdMessage.error(message)
  }
}

const handleErrorMessage = <T>(
  requestConfig: RequestConfig,
  statusCode: number | string,
  response?: AxiosResponse<ApiResponse<T>>,
) => {
  const { showError = true, commonError, errorMessageFirst = false } = requestConfig
  if (showError) {
    if (commonError) {
      antdMessage.error(i18n.t('common.message.apiFailed'))
    } else {
      const { data: { error_message, message, error_code = statusCode } = {} } = response || {}
      if (error_code && !errorMessageFirst) {
        handleErrorCodes(error_code)
      } else {
        antdMessage.error(error_message || message || i18n.t('common.message.apiFailed'))
      }
    }
  }
}

export const requestResponse = <T>(requestConfig: RequestConfig): Promise<AxiosResponse<T>> => {
  return new Promise((resolve, reject) => {
    apiClient
      .request<any, AxiosResponse<T>>(requestConfig)
      .then((response) => {
        resolve(response)
      })
      .catch((error: AxiosError) => {
        const { errorCode } = (error.response?.data ?? {}) as { errorCode: number }
        if (errorCode === 1103) {
          globalThis.location.reload()
        } else {
          handleErrorMessage<T>(
            requestConfig,
            error.code,
            error.response as AxiosResponse<ApiResponse<T>>,
          )
        }
        reject(error as Error)
      })
  })
}

const request = <T>(requestConfig: RequestConfig): Promise<ApiResponse<T>> => {
  return new Promise((resolve, reject) => {
    requestResponse<ApiResponse<T>>(requestConfig)
      .then((response) => {
        const { status, data } = response
        const statusCode = data.status_code || status

        if (statusCode !== 200 && statusCode !== 201) {
          handleErrorMessage<T>(requestConfig, statusCode, response)
          reject(new ApiError(data.error_code, data.error_message, statusCode))
        } else {
          resolve(data)
        }
      })
      .catch((error: AxiosError) => {
        reject(error)
      })
  })
}

export const castError = (error: any) => {
  return error as ApiError
}

export const SystemRequestParams = {
  module_id: '',
}

export const setSystemRequestParams = (params: typeof SystemRequestParams) => {
  Object.assign(SystemRequestParams, params)
}

export default request
