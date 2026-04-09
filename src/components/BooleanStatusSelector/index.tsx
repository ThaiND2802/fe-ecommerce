import { Select, SelectProps } from 'antd'
import useLocaleGroup from 'src/locales/useLocaleGroup'

type OptionType = {
  label: string
  value: boolean
}

const Index = (props: SelectProps<boolean, OptionType>) => {
  const [t] = useLocaleGroup('product')

  const options = [
    {
      label: t.boolean.active,
      value: true,
    },
    {
      label: t.boolean.inactive,
      value: false,
    },
  ]

  return <Select<boolean, OptionType> options={options} {...props} />
}

export default Index
