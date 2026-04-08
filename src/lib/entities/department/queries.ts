import { infiniteQueryOptions } from '@tanstack/react-query'

import { getDepartmentList } from './api'

export const departmentQueries = {
  all: () => ['departments'],

  lists: () => [...departmentQueries.all(), 'list'],

  listInfinity: () =>
    infiniteQueryOptions({
      queryKey: [...departmentQueries.lists(), 'infinity'],
      queryFn: ({ pageParam }) => getDepartmentList({ page_index: pageParam, page_size: 100 }),
      getNextPageParam: (lastPage) =>
        lastPage.pagination.page_index + 1 < lastPage.pagination.total_page
          ? lastPage.pagination.page_index + 1
          : undefined,
      initialPageParam: 0,
      select: (data) => data.pages.flatMap((page) => page.data),
    }),
}
