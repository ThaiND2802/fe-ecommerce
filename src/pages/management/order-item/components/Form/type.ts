export enum FormFields {
  Id = 'id',
  OrderId = 'order_id',
  ProductId = 'product_id',
  Coefficient0 = 'coefficient_0',
  Coefficient1 = 'coefficient_1',
  Coefficient2 = 'coefficient_2',
  Coefficient3 = 'coefficient_3',
  Coefficient4 = 'coefficient_4',
  Coefficient5 = 'coefficient_5',
  Quantity = 'quantity',
  UnitPrice = 'unit_price',
  Total = 'total',
}

export interface IFormValue {
  [FormFields.Id]: string
  [FormFields.OrderId]: string
  [FormFields.ProductId]: string
  [FormFields.Coefficient0]: number
  [FormFields.Coefficient1]: number
  [FormFields.Coefficient2]: number
  [FormFields.Coefficient3]: number
  [FormFields.Coefficient4]: number
  [FormFields.Coefficient5]: number
  [FormFields.Quantity]: number
  [FormFields.UnitPrice]: number
  [FormFields.Total]: number
}
