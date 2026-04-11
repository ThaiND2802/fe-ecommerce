import { useMutation } from '@tanstack/react-query'

import request, { ApiResponse } from 'src/api/request'
import { ENDPOINT, HTTP_STATUS_RESPONSE_KEY } from 'src/constants/api'
import { setSession } from 'src/auth'
import { VITE_APP_BACKEND_IDENTITY } from 'src/environments/environment'
import { setEncryptedItem } from 'src/utils/storage'
import i18n from 'src/locales/i18n'

interface ILoginResponse {
  Token: string
  RefreshToken: string
  ExpiresAtUtc: string
  ExpiresInSeconds: number
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
      const accessToken = response.data?.Token
      const refreshToken = response.data?.RefreshToken

      if (response.statusCode === HTTP_STATUS_RESPONSE_KEY.SUCCESS && accessToken && refreshToken) {
        setSession({
          accessToken,
          refreshToken,
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
