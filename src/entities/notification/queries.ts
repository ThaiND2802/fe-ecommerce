import { queryOptions, infiniteQueryOptions } from '@tanstack/react-query'

import { getNextPageParam } from 'src/utils/query'
import { getNotificationList, GetNotificationListParams, getNotificationUnreadCount } from './api'

export const notificationQueries = {
  all: () => ['notification'],

  lists: () => [...notificationQueries.all(), 'list'],
  list: (params: GetNotificationListParams) =>
    queryOptions({
      queryKey: [...notificationQueries.lists(), params],
      queryFn: () => getNotificationList(params),
      select: (data) => data.data,
    }),
  listInfinity: (notRead = false) =>
    infiniteQueryOptions({
      queryKey: [...notificationQueries.lists(), 'infinity', notRead],
      queryFn: ({ pageParam }) =>
        getNotificationList({ page_index: pageParam, page_size: 20, is_read: !notRead }),
      getNextPageParam,
      initialPageParam: 0,
    }),

  unreadCount: () =>
    queryOptions({
      queryKey: [...notificationQueries.all(), 'unreadCount'],
      queryFn: () => getNotificationUnreadCount(),
      select: (data) => data.data,
    }),
}
