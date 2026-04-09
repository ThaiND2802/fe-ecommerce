import useTableColumnsSelection from "src/lib/components/TableColumnSelect/useColumn"
import { useDefaultTableColumns } from "../Table/column"
import { CustomerItem } from "src/entities/management/customer"

type ITableData = CustomerItem
const useColumnSelect = () => {
  const defaultColumns = useDefaultTableColumns()
  const { columns, setColumns } = useTableColumnsSelection<ITableData>(
    'customer',
    defaultColumns,
  )
  return {
    columns,
    setColumns,
  }
}

export default useColumnSelect