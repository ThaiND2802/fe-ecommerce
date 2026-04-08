import request, { PaginationParams } from 'src/lib/services/request'

import { ConfigRoomItem } from './types'

export interface GetConfigRoomListParams extends PaginationParams {
  filter?: string
  sort_field?: string
  is_descending?: boolean
}
export const getConfigRoomList = (params: GetConfigRoomListParams) => {
  return request<ConfigRoomItem[]>({
    url: 'meeting/api/v1/meeting-config/get-list',
    method: 'GET',
    params,
  })
}

export const createConfigRoom = (data: ConfigRoomItem) => {
  return request({
    url: 'meeting/api/v1/meeting-config/create',
    method: 'POST',
    data,
  })
}

export const updateConfigRoom = (data: ConfigRoomItem) => {
  return request({
    url: 'meeting/api/v1/meeting-config/update',
    method: 'PUT',
    data,
  })
}
