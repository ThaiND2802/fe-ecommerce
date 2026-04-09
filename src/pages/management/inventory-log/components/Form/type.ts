export enum FormFields {
  Id = 'id',
  InventoryId = 'inventory_id',
  MovementType = 'movement_type',
  Quantity = 'quantity',
  Balance = 'balance',
  ReferenceId = 'reference_id',
  ReferenceType = 'reference_type',
  Notes = 'notes',
}

export interface IFormValue {
  [FormFields.Id]: string
  [FormFields.InventoryId]: string
  [FormFields.MovementType]: number
  [FormFields.Quantity]: number
  [FormFields.Balance]: number
  [FormFields.ReferenceId]: string
  [FormFields.ReferenceType]: string
  [FormFields.Notes]: string
}
