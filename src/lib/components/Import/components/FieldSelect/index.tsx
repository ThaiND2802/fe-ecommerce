import Select, { SelectSearchProps } from '../../../SelectSearch'

interface IProps extends SelectSearchProps<{ label: string; value: string }> {}

const Index = ({ ...props }: IProps) => {
  return <Select {...props} />
}

export default Index
