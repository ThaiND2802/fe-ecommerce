import { CodeGeneratorItem } from 'src/entities/management/code-generator'
import useTableColumnsSelection from 'src/lib/components/TableColumnSelect/useColumn'
import { useDefaultTableColumns } from '../Table/column'

type ITableData = CodeGeneratorItem

const useColumnSelect = () => {
  const defaultColumns = useDefaultTableColumns()
  const { columns, setColumns } = useTableColumnsSelection<ITableData>(
    'code-generator',
    defaultColumns,
  )

  return {
    columns,
    setColumns,
  }
}

export default useColumnSelect
