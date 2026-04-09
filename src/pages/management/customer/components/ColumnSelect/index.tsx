import TableColumnSelect from 'src/lib/components/TableColumnSelect'
import useColumnSelect from './hook'

const Index = () => {
  const { columns, setColumns } = useColumnSelect()
  return <TableColumnSelect columns={columns} onChange={setColumns} />
}

export default Index