import { queryOptions } from '@tanstack/react-query'
import { getInventoryDetail, getInventoryList, GetInventoryListParams } from './api'

export const inventoryQueries = {
  all: () => ['Inventory'],

  lists: () => [...inventoryQueries.all(), 'list'],
  list: (params: GetInventoryListParams) =>
    queryOptions({
      queryKey: [...inventoryQueries.lists(), params],
      queryFn: () => getInventoryList(params),
    }),

  details: () => [...inventoryQueries.all(), 'detail'],
  detail: (id: string) =>
    queryOptions({
      queryKey: [...inventoryQueries.details(), id],
      queryFn: () => getInventoryDetail(id),
      enabled: !!id,
    }),
}
