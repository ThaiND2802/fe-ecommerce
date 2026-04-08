import Select, { SelectSearchProps } from '../../../SelectSearch'
import { useContextStore as useStore } from '../../context'

interface IProps extends SelectSearchProps<{ label: string; value: string }> {}

const Index = ({ ...props }: IProps) => {
  const sheets = useStore((state) => state.sheets)

  return (
    <Select noSearch options={sheets.map((sheet) => ({ label: sheet, value: sheet }))} {...props} />
  )
}

export default Index
