import request, { PaginationParams } from 'src/lib/services/request'
import { OrderItem } from './types'

export interface GetOrderItemListParams extends PaginationParams {
  filter?: string
  sort_field?: string
  search_fields?: string
  ignore_ids?: string[]
  is_descending?: boolean
}

export const getOrderItemList = (params: GetOrderItemListParams) => {
  return request<OrderItem[]>({
    url: '/stationery/api/v1/order-items/gets',
    method: 'GET',
    params,
  })
}

export const getOrderItemDetail = (id: string) => {
  return request<OrderItem>({
    url: `/stationery/api/v1/order-items/${id}`,
    method: 'GET',
  })
}

export interface CreateOrderItemParams {
  id: string
  order_id: string
  product_id: string
  quantity: number
  coefficient_0: number
  coefficient_1: number
  coefficient_2: number
  coefficient_3: number
  coefficient_4: number
  coefficient_5: number
  unit_price: number
  total: number
}

export const createOrderItem = (data: CreateOrderItemParams) => {
  return request<string>({
    url: '/stationery/api/v1/order-items/create',
    method: 'POST',
    data,
  })
}

export interface UpdateOrderItemParams extends CreateOrderItemParams {
  original_id: string
}

export const updateOrderItem = (data: UpdateOrderItemParams) => {
  return request<string>({
    url: '/stationery/api/v1/order-items/update',
    method: 'PUT',
    data,
  })
}

export const deleteOrderItem = (id: string) => {
  return request<string>({
    url: `/stationery/api/v1/order-items/delete/${id}`,
    method: 'DELETE',
  })
}
