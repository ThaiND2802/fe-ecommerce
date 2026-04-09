import { InventoryItem } from 'src/entities/management/inventory'
import useTableColumnsSelection from 'src/lib/components/TableColumnSelect/useColumn'
import { useDefaultTableColumns } from '../Table/column'

type ITableData = InventoryItem

const useColumnSelect = () => {
  const defaultColumns = useDefaultTableColumns()
  const { columns, setColumns } = useTableColumnsSelection<ITableData>('inventory', defaultColumns)

  return {
    columns,
    setColumns,
  }
}

export default useColumnSelect
