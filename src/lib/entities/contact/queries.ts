import { queryOptions } from '@tanstack/react-query'

import { getContactDetail } from './api'

export const contactQueries = {
  all: () => ['contacts'],

  details: () => [...contactQueries.all(), 'details'],
  detail: (id: string) =>
    queryOptions({
      queryKey: [...contactQueries.details(), id],
      queryFn: () => getContactDetail(id),
      select: (data) => data.data[0],
      enabled: !!id,
      staleTime: 60 * 1000,
    }),
}
