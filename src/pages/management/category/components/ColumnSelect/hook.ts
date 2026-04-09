import { CategoryItem } from 'src/entities/management/category'
import useTableColumnsSelection from 'src/lib/components/TableColumnSelect/useColumn'
import { useDefaultTableColumns } from '../Table/column'

type ITableData = CategoryItem

const useColumnSelect = () => {
  const defaultColumns = useDefaultTableColumns()
  const { columns, setColumns } = useTableColumnsSelection<ITableData>('category', defaultColumns)

  return {
    columns,
    setColumns,
  }
}

export default useColumnSelect
