import { ProductItem } from 'src/entities/management/product'
import useTableColumnsSelection from 'src/lib/components/TableColumnSelect/useColumn'
import { useDefaultTableColumns } from '../Table/column'

type ITableData = ProductItem

const useColumnSelect = () => {
  const defaultColumns = useDefaultTableColumns()
  const { columns, setColumns } = useTableColumnsSelection<ITableData>('product', defaultColumns)

  return {
    columns,
    setColumns,
  }
}

export default useColumnSelect
