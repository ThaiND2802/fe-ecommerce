import { CustomerType } from "src/entities/management/customer/types"

export enum FormFields {
  Code = 'code',
  Name = 'name',
  Email = 'email',
  Phone = 'phone',
  Address = 'address',
  TaxCode = 'tax_code',
  ContactPerson = 'contact_person',
  CreditLimit = 'credit_limit',
  CurrentDebt = 'current_debt',
  CustomerType = 'customer_type',
}
export interface IFormValue {
  [FormFields.Code]: string
  [FormFields.Name]: string
  [FormFields.Email]: string
  [FormFields.Phone]: string
  [FormFields.Address]: string
  [FormFields.TaxCode]: string
  [FormFields.ContactPerson]: string
  [FormFields.CreditLimit]: number
  [FormFields.CurrentDebt]: number
  [FormFields.CustomerType]: CustomerType
}