import request, { PaginationParams } from 'src/lib/services/request'
import { InventoryItem } from './types'

export interface GetInventoryListParams extends PaginationParams {
  filter?: string
  sort_field?: string
  search_fields?: string
  ignore_ids?: string[]
  is_descending?: boolean
}

export const getInventoryList = (params: GetInventoryListParams) => {
  return request<InventoryItem[]>({
    url: '/stationery/api/v1/inventories/gets',
    method: 'GET',
    params,
  })
}

export const getInventoryDetail = (id: string) => {
  return request<InventoryItem>({
    url: `/stationery/api/v1/inventories/${id}`,
    method: 'GET',
  })
}

export interface CreateInventoryParams {
  id: string
  product_id: string
  quantity: number
  reserved_quantity: number
  available_quantity: number
  reorder_level: number
  last_updated: string
}

export const createInventory = (data: CreateInventoryParams) => {
  return request<string>({
    url: '/stationery/api/v1/inventories/create',
    method: 'POST',
    data,
  })
}

export interface UpdateInventoryParams extends CreateInventoryParams {
  original_id: string
}

export const updateInventory = (data: UpdateInventoryParams) => {
  return request<string>({
    url: '/stationery/api/v1/inventories/update',
    method: 'PUT',
    data,
  })
}

export const deleteInventory = (id: string) => {
  return request<string>({
    url: `/stationery/api/v1/inventories/delete/${id}`,
    method: 'DELETE',
  })
}
