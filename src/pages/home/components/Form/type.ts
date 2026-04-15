export enum FormFields {
  OrderId = 'order_id',
  OrderDate = 'order_date',
  Products = 'products',
}

export enum ProductFields {
  ProductId = 'product_id',
  Amount = 'amount',
}

export interface IProductFormValue {
  [ProductFields.ProductId]: string
  [ProductFields.Amount]: number
  unit_price?: number
}

export interface IFormValue {
  [FormFields.OrderId]: string
  [FormFields.OrderDate]: string
  [FormFields.Products]: IProductFormValue[]
}
