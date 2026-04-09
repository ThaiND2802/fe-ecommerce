import useLocaleGroup from 'src/locales/useLocaleGroup'
import { TableColumnType } from 'src/lib/components/TableColumnSelect'
import { CodeGeneratorItem } from 'src/entities/management/code-generator'

type ITableData = CodeGeneratorItem

export enum EColumnKey {
  Id = 'id',
  Prefix = 'prefix',
  LastNumber = 'last_number',
  CreatedAt = 'created_at',
  UpdatedAt = 'updated_at',
}

export const useDefaultTableColumns = () => {
  const [t] = useLocaleGroup('codeGenerator')

  return [
    {
      key: EColumnKey.Id,
      label: t.table.columns.id,
      isMandatory: true,
      isActive: true,
    },
    {
      key: EColumnKey.Prefix,
      label: t.table.columns.prefix,
      isActive: true,
    },
    {
      key: EColumnKey.LastNumber,
      label: t.table.columns.last_number,
      isActive: true,
    },
    {
      key: EColumnKey.CreatedAt,
      label: t.table.columns.created_at,
      isActive: true,
    },
    {
      key: EColumnKey.UpdatedAt,
      label: t.table.columns.updated_at,
      isActive: true,
    },
  ] as TableColumnType<ITableData>[]
}
