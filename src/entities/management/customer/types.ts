export enum CustomerType {
  CUSTOMER = 1,
  SUPPLIER = 2,
  BOTH = 3,
}
export interface CustomerItem {
  id: string
  code: string
  name: string
  email: string
  phone: string
  address: string
  tax_code: string
  contact_person: string
  credit_limit: number
  current_debt: number
  customer_type: CustomerType
}