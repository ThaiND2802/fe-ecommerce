import { queryOptions } from '@tanstack/react-query'
import { getOrderDetail, getOrderList, GetOrderListParams } from './api'

export const orderQueries = {
  all: () => ['Order'],

  lists: () => [...orderQueries.all(), 'list'],
  list: (params: GetOrderListParams) =>
    queryOptions({
      queryKey: [...orderQueries.lists(), params],
      queryFn: () => getOrderList(params),
    }),

  details: () => [...orderQueries.all(), 'detail'],
  detail: (id: string) =>
    queryOptions({
      queryKey: [...orderQueries.details(), id],
      queryFn: () => getOrderDetail(id),
      enabled: !!id,
    }),
}
