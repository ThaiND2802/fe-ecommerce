import { queryOptions } from '@tanstack/react-query'
import { getTenantDetail, getTenantList, GetTenantListParams } from './api'

export const tenantQueries = {
  all: () => ['Tenant'],

  lists: () => [...tenantQueries.all(), 'list'],
  list: (params: GetTenantListParams) =>
    queryOptions({
      queryKey: [...tenantQueries.lists(), params],
      queryFn: () => getTenantList(params),
    }),

  details: () => [...tenantQueries.all(), 'detail'],
  detail: (id: string) =>
    queryOptions({
      queryKey: [...tenantQueries.details(), id],
      queryFn: () => getTenantDetail(id),
      enabled: !!id,
    }),
}
