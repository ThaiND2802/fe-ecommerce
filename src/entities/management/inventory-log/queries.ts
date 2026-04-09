import { queryOptions } from '@tanstack/react-query'
import { getInventoryLogDetail, getInventoryLogList, GetInventoryLogListParams } from './api'

export const inventoryLogQueries = {
  all: () => ['InventoryLog'],

  lists: () => [...inventoryLogQueries.all(), 'list'],
  list: (params: GetInventoryLogListParams) =>
    queryOptions({
      queryKey: [...inventoryLogQueries.lists(), params],
      queryFn: () => getInventoryLogList(params),
    }),

  details: () => [...inventoryLogQueries.all(), 'detail'],
  detail: (id: string) =>
    queryOptions({
      queryKey: [...inventoryLogQueries.details(), id],
      queryFn: () => getInventoryLogDetail(id),
      enabled: !!id,
    }),
}
