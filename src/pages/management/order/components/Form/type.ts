import { OrderStatus, OrderType } from 'src/entities/management/order/types'

export enum FormFields {
  OrderCode = 'order_code',
  CustomerId = 'customer_id',
  OrderDate = 'order_date',
  DueDate = 'due_date',
  OrderType = 'order_type',
  DeliveryAddress = 'delivery_address',
  VatRate = 'vat_rate',
  VatAmount = 'vat_amount',
  TotalAmount = 'total_amount',
  TotalAmountWithVat = 'total_amount_with_vat',
  AmountPaid = 'amount_paid',
  DebtAmount = 'debt_amount',
  PaymentMethod = 'payment_method',
  Status = 'status',
  Note = 'note',
}

export interface IFormValue {
  [FormFields.OrderCode]: string
  [FormFields.CustomerId]: string
  [FormFields.OrderDate]: string
  [FormFields.DueDate]: string
  [FormFields.OrderType]: OrderType
  [FormFields.DeliveryAddress]: string
  [FormFields.VatRate]: number
  [FormFields.VatAmount]: number
  [FormFields.TotalAmount]: number
  [FormFields.TotalAmountWithVat]: number
  [FormFields.AmountPaid]: number
  [FormFields.DebtAmount]: number
  [FormFields.PaymentMethod]: string
  [FormFields.Status]: OrderStatus
  [FormFields.Note]: string
}
