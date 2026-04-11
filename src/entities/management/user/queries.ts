import { queryOptions } from '@tanstack/react-query'
import { getUserDetail, getUserList, GetUserListParams } from './api'

export const userQueries = {
  all: () => ['User'],

  lists: () => [...userQueries.all(), 'list'],
  list: (params: GetUserListParams) =>
    queryOptions({
      queryKey: [...userQueries.lists(), params],
      queryFn: () => getUserList(params),
    }),

  details: () => [...userQueries.all(), 'detail'],
  detail: (id: string) =>
    queryOptions({
      queryKey: [...userQueries.details(), id],
      queryFn: () => getUserDetail(id),
      enabled: !!id,
    }),
}
