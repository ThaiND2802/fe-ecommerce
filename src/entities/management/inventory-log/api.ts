import request, { PaginationParams } from 'src/lib/services/request'
import { InventoryLogItem } from './types'

export interface GetInventoryLogListParams extends PaginationParams {
  filter?: string
  sort_field?: string
  search_fields?: string
  ignore_ids?: string[]
  is_descending?: boolean
}

export const getInventoryLogList = (params: GetInventoryLogListParams) => {
  return request<InventoryLogItem[]>({
    url: '/stationery/api/v1/inventory-logs/gets',
    method: 'GET',
    params,
  })
}

export const getInventoryLogDetail = (id: string) => {
  return request<InventoryLogItem>({
    url: `/stationery/api/v1/inventory-logs/${id}`,
    method: 'GET',
  })
}

export interface CreateInventoryLogParams {
  id: string
  inventory_id: string
  movement_type: number
  quantity: number
  balance: number
  reference_id: string
  reference_type: string
  notes: string
}

export const createInventoryLog = (data: CreateInventoryLogParams) => {
  return request<string>({
    url: '/stationery/api/v1/inventory-logs/create',
    method: 'POST',
    data,
  })
}

export interface UpdateInventoryLogParams extends CreateInventoryLogParams {
  original_id: string
}

export const updateInventoryLog = (data: UpdateInventoryLogParams) => {
  return request<string>({
    url: '/stationery/api/v1/inventory-logs/update',
    method: 'PUT',
    data,
  })
}

export const deleteInventoryLog = (id: string) => {
  return request<string>({
    url: `/stationery/api/v1/inventory-logs/delete/${id}`,
    method: 'DELETE',
  })
}
