import { Select, SelectProps } from 'antd'
import useLocaleGroup from 'src/locales/useLocaleGroup'
import { OrderType } from 'src/entities/management/order/types'

const Index = (props: SelectProps) => {
  const [t] = useLocaleGroup('order')

  const options = [
    {
      label: t.order_type.retail,
      value: OrderType.Retail,
    },
    {
      label: t.order_type.wholesale,
      value: OrderType.Wholesale,
    },
    {
      label: t.order_type.online,
      value: OrderType.Online,
    },
  ]

  return <Select options={options} {...props} />
}

export default Index
