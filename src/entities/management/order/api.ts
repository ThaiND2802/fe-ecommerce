import request, { PaginationParams } from 'src/lib/services/request'
import { OrderItem, OrderStatus, OrderType } from './types'

export interface GetOrderListParams extends PaginationParams {
  filter?: string
  sort_field?: string
  search_fields?: string
  ignore_ids?: string[]
  is_descending?: boolean
}

export const getOrderList = (params: GetOrderListParams) => {
  return request<OrderItem[]>({
    url: '/stationery/api/v1/orders/gets',
    method: 'GET',
    params,
  })
}

export const getOrderDetail = (id: string) => {
  return request<OrderItem>({
    url: `/stationery/api/v1/orders/${id}`,
    method: 'GET',
  })
}

export interface CreateOrderParams {
  order_code: string
  customer_id: string
  order_date: string
  due_date: string
  order_type: OrderType
  delivery_address: string
  vat_rate: number
  vat_amount: number
  total_amount: number
  total_amount_with_vat: number
  amount_paid: number
  debt_amount: number
  payment_method: string
  status: OrderStatus
  note: string
}

export const createOrder = (data: CreateOrderParams) => {
  return request<string>({
    url: '/stationery/api/v1/orders/create',
    method: 'POST',
    data,
  })
}

export interface UpdateOrderParams extends CreateOrderParams {
  id: string
}

export const updateOrder = (data: UpdateOrderParams) => {
  return request<string>({
    url: '/stationery/api/v1/orders/update',
    method: 'PUT',
    data,
  })
}

export const deleteOrder = (id: string) => {
  return request<string>({
    url: `/stationery/api/v1/orders/delete/${id}`,
    method: 'DELETE',
  })
}
