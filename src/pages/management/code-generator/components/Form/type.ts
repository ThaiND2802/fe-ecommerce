export enum FormFields {
  Id = 'id',
  Prefix = 'prefix',
  LastNumber = 'last_number',
  CreatedAt = 'created_at',
  UpdatedAt = 'updated_at',
}

export interface IFormValue {
  [FormFields.Id]: string
  [FormFields.Prefix]: string
  [FormFields.LastNumber]: number
  [FormFields.CreatedAt]: string
  [FormFields.UpdatedAt]: string
}
