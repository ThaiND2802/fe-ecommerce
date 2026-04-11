import useLocaleGroup from 'src/locales/useLocaleGroup'
import { TableColumnType } from 'src/lib/components/TableColumnSelect'
import { TenantItem } from 'src/entities/management/tenant'

type ITableData = TenantItem

export enum EColumnKey {
  Id = 'id',
  Name = 'name',
  Schema = 'schema',
}

export const useDefaultTableColumns = () => {
  const [t] = useLocaleGroup('tenant')

  return [
    {
      key: EColumnKey.Id,
      label: t.table.columns.id,
      isMandatory: true,
      isActive: true,
    },
    {
      key: EColumnKey.Name,
      label: t.table.columns.name,
      isActive: true,
    },
    {
      key: EColumnKey.Schema,
      label: t.table.columns.schema,
      isActive: true,
    },
  ] as TableColumnType<ITableData>[]
}
