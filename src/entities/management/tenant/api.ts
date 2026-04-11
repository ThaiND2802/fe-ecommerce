import request, { PaginationParams } from 'src/lib/services/request'
import { TenantItem } from './types'

export interface GetTenantListParams extends PaginationParams {
  filter?: string
  sort_field?: string
  search_fields?: string
  ignore_ids?: string[]
  is_descending?: boolean
}

export const getTenantList = (params: GetTenantListParams) => {
  return request<TenantItem[]>({
    url: '/stationery/api/v1/tenants/gets',
    method: 'GET',
    params,
  })
}

export const getTenantDetail = (id: string) => {
  return request<TenantItem>({
    url: `/stationery/api/v1/tenants/${id}`,
    method: 'GET',
  })
}

export interface CreateTenantParams {
  id: string
  name: string
  schema: string
}

export const createTenant = (data: CreateTenantParams) => {
  return request<string>({
    url: '/stationery/api/v1/tenants/create',
    method: 'POST',
    data,
  })
}

export interface UpdateTenantParams extends CreateTenantParams {
  original_id: string
}

export const updateTenant = (data: UpdateTenantParams) => {
  return request<string>({
    url: '/stationery/api/v1/tenants/update',
    method: 'PUT',
    data,
  })
}

export const deleteTenant = (id: string) => {
  return request<string>({
    url: `/stationery/api/v1/tenants/delete/${id}`,
    method: 'DELETE',
  })
}
