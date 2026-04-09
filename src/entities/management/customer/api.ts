import request, { PaginationParams } from "src/lib/services/request"
import { CustomerItem, CustomerType } from "./types"

export interface GetCustomerListParams extends PaginationParams {
  filter?: string
  sort_field?: string
  search_fields?: string
  ignore_ids?: string[]
  is_descending?: boolean
}
export const getCustomerList = (params: GetCustomerListParams) => {
  return request<CustomerItem[]>({
    url: '/stationery/api/v1/categories/gets',
    method: 'GET',
    params,
  })
}

export const getCustomerDetail = (id: string) => {
  return request<CustomerItem>({
    url: `/stationery/api/v1/categories/${id}`,
    method: 'GET',
  })
}

export interface CreateCustomerParams {
  code: string
  name: string
  email: string
  phone: string
  address: string
  tax_code: string
  contact_person: string
  credit_limit: number
  current_debt: number
  customer_type: CustomerType
}
export const createCustomer = (data: CreateCustomerParams) => {
  return request<string>({
    url: '/stationery/api/v1/categories/create',
    method: 'POST',
    data,
  })
}

export interface UpdateCustomerParams extends CreateCustomerParams {
  id: string
}
export const updateCustomer = (data: UpdateCustomerParams) => {
  return request<string>({
    url: `/stationery/api/v1/categories/update`,
    method: 'PUT',
    data,
  })
}

export const deleteCustomer = (id: string) => {
  return request<string>({
    url: `/stationery/api/v1/categories/delete/${id}`,
    method: 'DELETE',
  })
}