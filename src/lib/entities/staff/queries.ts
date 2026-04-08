import { queryOptions } from '@tanstack/react-query'

import { getStaffDetail } from './api'

export const staffQueries = {
  all: () => ['staffs'],

  details: () => [...staffQueries.all(), 'details'],
  detail: (id: string) =>
    queryOptions({
      queryKey: [...staffQueries.details(), id],
      queryFn: () => getStaffDetail(id),
      select: (data) => data.data,
      enabled: !!id,
    }),
}
