import { queryOptions } from '@tanstack/react-query'
import { getOrderItemDetail, getOrderItemList, GetOrderItemListParams } from './api'

export const orderItemQueries = {
  all: () => ['OrderItem'],

  lists: () => [...orderItemQueries.all(), 'list'],
  list: (params: GetOrderItemListParams) =>
    queryOptions({
      queryKey: [...orderItemQueries.lists(), params],
      queryFn: () => getOrderItemList(params),
    }),

  details: () => [...orderItemQueries.all(), 'detail'],
  detail: (id: string) =>
    queryOptions({
      queryKey: [...orderItemQueries.details(), id],
      queryFn: () => getOrderItemDetail(id),
      enabled: !!id,
    }),
}
