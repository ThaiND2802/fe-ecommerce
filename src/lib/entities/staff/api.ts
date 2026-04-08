import request from '../../services/request'
import { IStaffDetail } from './types'

export const getStaffDetail = (id: string) => {
  return request<IStaffDetail>({
    url: `/staff/api/v1/staff/detail/${id}`,
    method: 'GET',
  })
}
