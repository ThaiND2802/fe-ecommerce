import request, { PaginationParams } from 'src/lib/services/request'

import { IProcessStepsResponse, IProcessListResponse, IApprovedRequestItem } from './types'

export interface GetProcessListParams extends PaginationParams {
  filter?: string
  sort_field?: string
  is_descending?: boolean
}
export const getProcessList = (params: GetProcessListParams) => {
  return request<IProcessListResponse>({
    url: '/bpm/api/v1/runtime/request/raci/process',
    method: 'GET',
    params,
  })
}

export const getProcessSteps = (id: string) => {
  return request<IProcessStepsResponse>({
    url: `/bpm/api/v1/process/${id}/design-steps`,
    method: 'GET',
  })
}

export interface GetProcessRuntimeStepsParams {
  department_id?: string
  process_id?: string
  request_id?: string
}
export const getProcessRuntimeSteps = (params: GetProcessRuntimeStepsParams) => {
  return request<IProcessStepsResponse>({
    url: `/bpm/api/v1/runtime/request/design`,
    method: 'GET',
    params,
  })
}

export const getApprovedRequestList = () => {
  return request<IApprovedRequestItem[]>({
    url: '/bpm/api/v1/request/select',
    method: 'GET',
  })
}

export const getProcessLinkSteps = (id: string, linkedId: string) => {
  return request<IProcessStepsResponse>({
    url: `/raci/api/v1/process/design-steps`,
    method: 'GET',
    params: {
      id,
      linked_id: linkedId,
    },
  })
}
