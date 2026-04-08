import request from '../../services/request'
import { IContactDetail } from './types'

export const getContactDetail = (id: string) => {
  return request<IContactDetail>({
    url: `/user-management/api/v1/user/get-by-ids`,
    data: {
      ids: [id],
    },
    method: 'POST',
  })
}
