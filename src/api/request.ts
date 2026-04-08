import { message as antdMessage } from 'antd'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import i18n from 'i18next'

import { getAccessToken, logout, refreshSession } from 'src/auth'
import { ERROR_CODE } from 'src/constants/api'
import { LOCAL_STORAGE_KEY } from 'src/constants'
import { USER_LANGUAGE } from 'src/constants/app'
import { APP_GATEWAY, TENANT_HOST_PATTERN, VITE_APP_TENANT_ID } from 'src/environments/environment'
import { getEncryptedItem } from 'src/utils/storage'

interface RetryAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean
}

const Lang = {
  vi: 'vi-VN',
  en: 'en-US',
}

const host = globalThis.location.hostname
let tenantId = VITE_APP_TENANT_ID
if (host.includes(TENANT_HOST_PATTERN) || host.includes('subcription')) {
  tenantId = host.split('.').at(-5)
}

const lang = Lang[getEncryptedItem(USER_LANGUAGE)] ?? Lang.vi
const apiClient = axios.create({
  baseURL: APP_GATEWAY,
  timeout: 5000,
  headers: {
    'X-Frame-Options': 'DENY',
    'Content-Security-Policy': "frame-ancestors 'self';",
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    'firebase-token': getEncryptedItem(LOCAL_STORAGE_KEY.FCM_TOKEN),
    'x-tenant-id': tenantId || 'msm',
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
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryAxiosRequestConfig | undefined

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const session = await refreshSession()
        originalRequest.headers = originalRequest.headers ?? {}
        originalRequest.headers.Authorization = `Bearer ${session.accessToken}`

        return await apiClient.request(originalRequest)
      } catch (refreshError) {
        // await logout()
        return Promise.reject(refreshError as AxiosError)
      }
    }

    return Promise.reject(error)
  },
)

interface RequestConfig extends AxiosRequestConfig {
  showError?: boolean
  commonError?: boolean
}

export interface PaginationParams {
  page_index: number
  page_size: number
}

export interface ApiResponse<T> {
  statusCode: number
  errorCode: number
  message: string
  errorMessage: string
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

const handleErrorCodes = (errorCode: number | string) => {
  const messageKey = `common.errorCode.${errorCode}`
  const message = i18n.t(messageKey)

  if (message !== messageKey) {
    antdMessage.error(message)
  } else {
    antdMessage.error(i18n.t('common.message.apiFailed'))
  }
}

const handleErrorMessage = <T>(
  requestConfig: RequestConfig,
  statusCode: number | string,
  response?: AxiosResponse<ApiResponse<T>>,
) => {
  const { showError = true, commonError } = requestConfig
  if (showError) {
    if (commonError) {
      antdMessage.error(i18n.t('common.message.apiFailed'))
    } else {
      const { data: { errorMessage, message, errorCode = statusCode } = {} } = response || {}
      if (errorCode) {
        handleErrorCodes(errorCode)
      } else {
        antdMessage.error(errorMessage || message || i18n.t('common.message.apiFailed'))
      }
    }
  }
}

const request = <T>(requestConfig: RequestConfig): Promise<ApiResponse<T>> => {
  return new Promise((resolve, reject) => {
    apiClient
      .request<any, AxiosResponse<ApiResponse<T>>>(requestConfig)
      .then((response) => {
        const { status, data } = response
        const statusCode = data.statusCode || status

        if (statusCode !== 200 && statusCode !== 201) {
          handleErrorMessage<T>(requestConfig, statusCode, response)
          throw new ApiError(data.errorCode, data.errorMessage, statusCode)
        } else {
          resolve(data)
        }
      })
      .catch((error: AxiosError) => {
        const { error_code: errorCode } = (error.response?.data ?? {}) as { error_code: number }
        if (errorCode === ERROR_CODE.LOGIN_FAILED) {
          window.location.reload()
        }
        handleErrorMessage<T>(
          requestConfig,
          error.code,
          error.response as AxiosResponse<ApiResponse<T>>,
        )
        reject(error)
      })
  })
}

export const castError = (error: any) => {
  return error as ApiError
}

export default request
