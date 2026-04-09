import { InventoryLogItem } from 'src/entities/management/inventory-log'
import useTableColumnsSelection from 'src/lib/components/TableColumnSelect/useColumn'
import { useDefaultTableColumns } from '../Table/column'

type ITableData = InventoryLogItem

const useColumnSelect = () => {
  const defaultColumns = useDefaultTableColumns()
  const { columns, setColumns } = useTableColumnsSelection<ITableData>(
    'inventory-log',
    defaultColumns,
  )

  return {
    columns,
    setColumns,
  }
}

export default useColumnSelect
