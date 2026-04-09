export enum OrderStatus {
  Draft = 1,
  Confirmed = 2,
  WaitingDelivery = 3,
  Delivering = 4,
  Completed = 5,
  DeliveryFailed = 6,
  Cancelled = 7,
}

export enum OrderType {
  Retail = 1,
  Wholesale = 2,
  Online = 3,
}

export interface OrderItem {
  id: string
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
