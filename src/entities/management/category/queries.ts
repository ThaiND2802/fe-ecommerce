import { queryOptions } from '@tanstack/react-query'
import { getCategoryDetail, getCategoryList, GetCategoryListParams } from './api'

export const categoryQueries = {
  all: () => ['Category'],

  lists: () => [...categoryQueries.all(), 'list'],
  list: (params: GetCategoryListParams) =>
    queryOptions({
      queryKey: [...categoryQueries.lists(), params],
      queryFn: () => getCategoryList(params),
    }),

  details: () => [...categoryQueries.all(), 'detail'],
  detail: (id: string) =>
    queryOptions({
      queryKey: [...categoryQueries.details(), id],
      queryFn: () => getCategoryDetail(id),
      enabled: !!id,
    }),
}
