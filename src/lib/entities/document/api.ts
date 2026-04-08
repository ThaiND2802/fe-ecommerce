import request from '../../services/request'
import { IDocumentItem } from './types'

export const getDocumentList = () => {
  return request<IDocumentItem[]>({
    url: '/document/api/v1/documents/get-select',
    method: 'GET',
  })
}
