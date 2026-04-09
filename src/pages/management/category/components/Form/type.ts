import { ItemStatus } from 'src/entities/management/category/types'

export enum FormFields {
  Id = 'id',
  Name = 'name',
  Description = 'description',
  Status = 'status',
}

export interface IFormValue {
  [FormFields.Id]: string
  [FormFields.Name]: string
  [FormFields.Description]: string
  [FormFields.Status]: ItemStatus
}
