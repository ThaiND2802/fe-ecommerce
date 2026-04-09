import useLocaleGroup from 'src/locales/useLocaleGroup'
import { TableColumnType } from 'src/lib/components/TableColumnSelect'
import { CategoryItem } from 'src/entities/management/category'

type ITableData = CategoryItem

export enum EColumnKey {
  Id = 'id',
  Name = 'name',
  Description = 'description',
  Status = 'status',
}

export const useDefaultTableColumns = () => {
  const [t] = useLocaleGroup('category')

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
      key: EColumnKey.Description,
      label: t.table.columns.description,
      isActive: true,
    },
    {
      key: EColumnKey.Status,
      label: t.table.columns.status,
      isActive: true,
    },
  ] as TableColumnType<ITableData>[]
}
