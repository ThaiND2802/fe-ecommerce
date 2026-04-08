import { queryOptions } from '@tanstack/react-query'

import { getDocumentList } from './api'

export const documentQueries = {
  all: () => ['approval'],

  lists: () => [...documentQueries.all(), 'list'],
  list: () =>
    queryOptions({
      queryKey: [...documentQueries.lists()],
      queryFn: () => getDocumentList(),
      select: (data) => data.data,
    }),
}
