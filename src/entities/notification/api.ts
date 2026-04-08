import request, { PaginationParams } from 'src/api/request'
import { ENDPOINT } from 'src/constants/api'
import { APP_GATEWAY } from 'src/environments/environment'
import { NotificationMessageGroup } from './types'

export interface GetNotificationListParams extends PaginationParams {
  is_read?: boolean
}
export const getNotificationList = (params: GetNotificationListParams) => {
  return request<NotificationMessageGroup[]>({
    url: `${APP_GATEWAY}${ENDPOINT.NOTIFICATIONS}`,
    params: {
      ...params,
      is_read: !params.is_read ? false : undefined,
    },
    showError: false,
  })
}

export const getNotificationUnreadCount = () => {
  return request<{ count: number; is_read: boolean }[]>({
    url: `${APP_GATEWAY}${ENDPOINT.NOTIFICATIONS_UNREAD_COUNT}`,
    showError: false,
  })
}

export const markNotificationRead = (id: string) => {
  return request<void>({
    url: `${APP_GATEWAY}${ENDPOINT.NOTIFICATIONS_READ.replace('{id}', id)}`,
    method: 'PUT',
  })
}

export const markNotificationReadAll = () => {
  return request<void>({
    url: `${APP_GATEWAY}${ENDPOINT.NOTIFICATIONS_READ_ALL}`,
    method: 'PUT',
  })
}

export interface RegisterFirebaseTokenParams {
  token: string
}
export const registerFirebaseToken = (params: RegisterFirebaseTokenParams) => {
  return request<void>({
    url: `${APP_GATEWAY}${ENDPOINT.NOTIFICATIONS_REGISTER_FIREBASE_TOKEN}`,
    method: 'POST',
    data: {
      ...params,
      type_device: 2,
    },
    showError: false,
  })
}
