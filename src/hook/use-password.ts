import { useMutation } from '@tanstack/react-query'
import request from 'src/api/request'
import { ENDPOINT } from 'src/constants/api'
import { VITE_APP_BACKEND_IDENTITY } from 'src/environments/environment'

interface ChangePasswordParams {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export const usePassword = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: () => void
} = {}) => {
  const passwordQuery = useMutation({
    mutationKey: ['change-password'],
    mutationFn: (params: ChangePasswordParams) =>
      request({
        url: `${VITE_APP_BACKEND_IDENTITY}${ENDPOINT.CHANGE_PASSWORD}`,
        method: 'POST',
        data: params,
      }),
    onSuccess,
    onError,
  })

  return passwordQuery
}
