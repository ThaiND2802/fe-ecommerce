import { queryOptions } from '@tanstack/react-query'
import {
  getCodeGeneratorDetail,
  getCodeGeneratorList,
  GetCodeGeneratorListParams,
} from './api'

export const codeGeneratorQueries = {
  all: () => ['CodeGenerator'],

  lists: () => [...codeGeneratorQueries.all(), 'list'],
  list: (params: GetCodeGeneratorListParams) =>
    queryOptions({
      queryKey: [...codeGeneratorQueries.lists(), params],
      queryFn: () => getCodeGeneratorList(params),
    }),

  details: () => [...codeGeneratorQueries.all(), 'detail'],
  detail: (id: string) =>
    queryOptions({
      queryKey: [...codeGeneratorQueries.details(), id],
      queryFn: () => getCodeGeneratorDetail(id),
      enabled: !!id,
    }),
}
