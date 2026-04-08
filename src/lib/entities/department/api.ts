import request from '../../services/request'
import { DepartmentListItem } from './types'

export interface IGetDepartmentListParams {
  page_index: number
  page_size: number
}
export const getDepartmentList = (params: IGetDepartmentListParams) => {
  return request<DepartmentListItem[]>({
    url: '/staff/api/v1/department/select/gets',
    method: 'GET',
    params,
  })
}
