export enum FormFields {
  Id = 'id',
  ProductId = 'product_id',
  Quantity = 'quantity',
  ReservedQuantity = 'reserved_quantity',
  AvailableQuantity = 'available_quantity',
  ReorderLevel = 'reorder_level',
  LastUpdated = 'last_updated',
}

export interface IFormValue {
  [FormFields.Id]: string
  [FormFields.ProductId]: string
  [FormFields.Quantity]: number
  [FormFields.ReservedQuantity]: number
  [FormFields.AvailableQuantity]: number
  [FormFields.ReorderLevel]: number
  [FormFields.LastUpdated]: string
}
