import { queryOptions } from '@tanstack/react-query'

import { getModuleList } from './api'

export const modulesQueries = {
  all: () => ['modules'],

  lists: () => [...modulesQueries.all(), 'list'],
  list: () =>
    queryOptions({
      queryKey: [...modulesQueries.lists()],
      queryFn: () => getModuleList(),
      select: (data) => data.data,
      staleTime: 60000,
    }),
}
