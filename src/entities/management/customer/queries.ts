import { getCustomerDetail, getCustomerList, GetCustomerListParams } from "./api";
import { queryOptions } from "@tanstack/react-query";

export const customerQueries = {
  all: () => ['Customer'],

  lists: () => [...customerQueries.all(), 'list'],
  list: (params: GetCustomerListParams) =>
    queryOptions({
      queryKey: [...customerQueries.lists(), params],
      queryFn: () => getCustomerList(params),
    }),

  details: () => [...customerQueries.all(), 'detail'],
  detail: (id: string) =>
    queryOptions({
      queryKey: [...customerQueries.details(), id],
      queryFn: () => getCustomerDetail(id),
      enabled: !!id,
    }),
}
