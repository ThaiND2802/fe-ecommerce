import { queryOptions } from '@tanstack/react-query'

import { getConfigRoomList, GetConfigRoomListParams } from './api'

export const settingQueries = {
  all: () => ['setting'],

  configRooms: () => [...settingQueries.all(), 'config-room'],
  configRoomList: (params: GetConfigRoomListParams) =>
    queryOptions({
      queryKey: [...settingQueries.configRooms(), params],
      queryFn: () => getConfigRoomList(params),
      select: (data) => data.data,
    }),
  getConfig: () =>
    queryOptions({
      queryKey: [...settingQueries.configRooms()],
      queryFn: () =>
        getConfigRoomList({
          page_index: 0,
          page_size: 1,
        }),
      select: (data) => data.data?.[0],
    }),
}
