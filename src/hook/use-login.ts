import { useMutation } from '@tanstack/react-query'

import request, { ApiResponse } from 'src/api/request'
import { ENDPOINT, HTTP_STATUS_RESPONSE_KEY } from 'src/constants/api'
import { setSession } from 'src/auth'
import { VITE_APP_BACKEND_IDENTITY } from 'src/environments/environment'
import { setEncryptedItem } from 'src/utils/storage'
import i18n from 'src/locales/i18n'

interface ILoginResponse {
  accessToken: string
  refreshToken: string
  deviceId: string
  defaultTenant: string
  expiresIn: number
  scope: string
  tokenType: string
}

export const useLogin = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
} = {}) => {
  return useMutation({
    mutationFn: (data: any) => {
      return request({
        method: 'POST',
        url: `${VITE_APP_BACKEND_IDENTITY}${ENDPOINT.LOGIN}`,
        data,
      })
    },
    onSuccess: (response: ApiResponse<ILoginResponse>) => {
      if (response.statusCode === HTTP_STATUS_RESPONSE_KEY.SUCCESS) {
        setSession({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
          deviceId: response.data.deviceId,
        })
        setEncryptedItem('lang', i18n.language)

        window.dispatchEvent(
          new CustomEvent('login', {
            detail: { message: 'success' },
          }),
        )
        onSuccess?.(response)
      } else {
        onError?.(response)
      }
    },
    onError,
  })
}
