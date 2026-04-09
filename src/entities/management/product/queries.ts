import { queryOptions } from '@tanstack/react-query'
import { getProductDetail, getProductList, GetProductListParams } from './api'

export const productQueries = {
  all: () => ['Product'],

  lists: () => [...productQueries.all(), 'list'],
  list: (params: GetProductListParams) =>
    queryOptions({
      queryKey: [...productQueries.lists(), params],
      queryFn: () => getProductList(params),
    }),

  details: () => [...productQueries.all(), 'detail'],
  detail: (id: string) =>
    queryOptions({
      queryKey: [...productQueries.details(), id],
      queryFn: () => getProductDetail(id),
      enabled: !!id,
    }),
}
