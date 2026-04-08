import { queryOptions } from '@tanstack/react-query'

import {
  getApprovedRequestList,
  getProcessLinkSteps,
  getProcessList,
  GetProcessListParams,
  getProcessRuntimeSteps,
  GetProcessRuntimeStepsParams,
  getProcessSteps,
} from './api'

export const approvalQueries = {
  all: () => ['approval'],

  lists: () => [...approvalQueries.all(), 'list'],
  list: (params: GetProcessListParams) =>
    queryOptions({
      queryKey: [...approvalQueries.lists(), params],
      queryFn: () => getProcessList(params),
      select: (data) => data.data,
    }),

  processStepsKey: () => [...approvalQueries.all(), 'processSteps'],
  processSteps: (id: string) =>
    queryOptions({
      queryKey: [...approvalQueries.processStepsKey(), id],
      queryFn: () => getProcessSteps(id),
      select: (data) => data.data,
      enabled: !!id,
    }),

  processRuntimeStepsKey: () => [...approvalQueries.all(), 'processRuntimeSteps'],
  processRuntimeSteps: (params: GetProcessRuntimeStepsParams) =>
    queryOptions({
      queryKey: [...approvalQueries.processRuntimeStepsKey(), params],
      queryFn: () => getProcessRuntimeSteps(params),
      select: (data) => data.data,
    }),

  approvedRequestsKey: () => [...approvalQueries.all(), 'approvedRequests'],
  approvedRequests: () =>
    queryOptions({
      queryKey: [...approvalQueries.approvedRequestsKey()],
      queryFn: () => getApprovedRequestList(),
      select: (data) => data.data,
    }),

  processLinkStepsKey: () => [...approvalQueries.all(), 'processLinkSteps'],
  processLinkSteps: (id: string, code?: string) =>
    queryOptions({
      queryKey: [...approvalQueries.processLinkStepsKey(), id, code],
      queryFn: () => getProcessLinkSteps(id, code),
      select: (data) => data.data,
    }),
}
