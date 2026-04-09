import useLocaleGroup from 'src/locales/useLocaleGroup'
import { TableColumnType } from 'src/lib/components/TableColumnSelect'
import { CustomerItem } from 'src/entities/management/customer'

type ITableData = CustomerItem

export enum EColumnKey {
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

export const useDefaultTableColumns = () => {
  const [t] = useLocaleGroup('customer')

  return [
    {
      key: EColumnKey.Code,
      label: t.table.columns.code,
      isActive: true,
    },
    {
      key: EColumnKey.Name,
      label: t.table.columns.name,
      isMandatory: true,
      isActive: true,
    },
    {
      key: EColumnKey.Email,
      label: t.table.columns.email,
      isActive: true,
    },
    {
      key: EColumnKey.Phone,
      label: t.table.columns.phone,
      isActive: true,
    },
    {
      key: EColumnKey.Address,
      label: t.table.columns.address,
      isActive: true,
    },
    {
      key: EColumnKey.TaxCode,
      label: t.table.columns.tax_code,
      isActive: true,
    },
    {
      key: EColumnKey.ContactPerson,
      label: t.table.columns.contact_person,
      isActive: true,
    },
    {
      key: EColumnKey.CreditLimit,
      label: t.table.columns.credit_limit,
      isActive: true,
    },
    {
      key: EColumnKey.CurrentDebt,
      label: t.table.columns.current_debt,
      isActive: true,
    },
    {
      key: EColumnKey.CustomerType,
      label: t.table.columns.customer_type,
      isActive: true,
    },
  ] as TableColumnType<ITableData>[]
}
