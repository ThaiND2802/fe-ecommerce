import { Select, SelectProps } from 'antd'
import useLocaleGroup from 'src/locales/useLocaleGroup'
import { ItemStatus } from 'src/entities/management/category/types'

const Index = (props: SelectProps) => {
  const [t] = useLocaleGroup('category')

  const options = [
    {
      label: t.status.inactive,
      value: ItemStatus.InActive,
    },
    {
      label: t.status.active,
      value: ItemStatus.Active,
    },
    {
      label: t.status.deleted,
      value: ItemStatus.Deleted,
    },
  ]

  return <Select options={options} {...props} />
}

export default Index
