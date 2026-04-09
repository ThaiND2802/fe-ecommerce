import { Select, SelectProps } from 'antd'
import useLocaleGroup from 'src/locales/useLocaleGroup'
import { OrderStatus } from 'src/entities/management/order/types'

const Index = (props: SelectProps) => {
  const [t] = useLocaleGroup('order')

  const options = [
    {
      label: t.status.draft,
      value: OrderStatus.Draft,
    },
    {
      label: t.status.confirmed,
      value: OrderStatus.Confirmed,
    },
    {
      label: t.status.waiting_delivery,
      value: OrderStatus.WaitingDelivery,
    },
    {
      label: t.status.delivering,
      value: OrderStatus.Delivering,
    },
    {
      label: t.status.completed,
      value: OrderStatus.Completed,
    },
    {
      label: t.status.delivery_failed,
      value: OrderStatus.DeliveryFailed,
    },
    {
      label: t.status.cancelled,
      value: OrderStatus.Cancelled,
    },
  ]

  return <Select options={options} {...props} />
}

export default Index
