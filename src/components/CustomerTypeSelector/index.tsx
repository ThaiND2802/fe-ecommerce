import { Select, SelectProps } from "antd"
import { CustomerType } from "src/entities/management/customer/types"
import useLocaleGroup from "src/locales/useLocaleGroup"

const Index = (props: SelectProps) => {
  const [t] = useLocaleGroup('customer')
  const options = [
    {
      label: t.customer_type.customer,
      value: CustomerType.CUSTOMER,
    },
    {
      label: t.customer_type.supplier,
      value: CustomerType.SUPPLIER,
    },
    {
      label: t.customer_type.both,
      value: CustomerType.BOTH,
    },
  ]
  return (
    <Select options={options} {...props} />
  )
}

export default Index