export enum FormFields {
  Id = 'id',
  Name = 'name',
  Schema = 'schema',
}

export interface IFormValue {
  [FormFields.Id]: string
  [FormFields.Name]: string
  [FormFields.Schema]: string
}
