import { ApiResponse } from 'src/api/request'

export const getNextPageParam = (lastPage: ApiResponse<any>) =>
  lastPage.pagination.page_index + 1 < lastPage.pagination.total_page
    ? lastPage.pagination.page_index + 1
    : undefined
