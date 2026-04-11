import { UserItem } from 'src/entities/management/user'
import useTableColumnsSelection from 'src/lib/components/TableColumnSelect/useColumn'
import { useDefaultTableColumns } from '../Table/column'

type ITableData = UserItem

const useColumnSelect = () => {
  const defaultColumns = useDefaultTableColumns()
  const { columns, setColumns } = useTableColumnsSelection<ITableData>('user', defaultColumns)

  return {
    columns,
    setColumns,
  }
}

export default useColumnSelect
