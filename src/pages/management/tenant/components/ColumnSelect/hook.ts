import { TenantItem } from 'src/entities/management/tenant'
import useTableColumnsSelection from 'src/lib/components/TableColumnSelect/useColumn'
import { useDefaultTableColumns } from '../Table/column'

type ITableData = TenantItem

const useColumnSelect = () => {
  const defaultColumns = useDefaultTableColumns()
  const { columns, setColumns } = useTableColumnsSelection<ITableData>('tenant', defaultColumns)

  return {
    columns,
    setColumns,
  }
}

export default useColumnSelect
