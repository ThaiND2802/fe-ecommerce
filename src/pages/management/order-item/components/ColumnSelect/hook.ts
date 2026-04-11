import { OrderItem } from 'src/entities/management/order-item'
import useTableColumnsSelection from 'src/lib/components/TableColumnSelect/useColumn'
import { useDefaultTableColumns } from '../Table/column'

type ITableData = OrderItem

const useColumnSelect = () => {
  const defaultColumns = useDefaultTableColumns()
  const { columns, setColumns } = useTableColumnsSelection<ITableData>('order-item', defaultColumns)

  return {
    columns,
    setColumns,
  }
}

export default useColumnSelect
