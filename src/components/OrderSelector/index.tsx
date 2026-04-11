import { Select, SelectProps } from 'antd'
import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { orderQueries } from 'src/entities/management/order'

type OptionType = {
  label: string
  value: string
}

const Index = (props: SelectProps<string, OptionType>) => {
  const { data, isLoading } = useQuery({
    ...orderQueries.list({
      page_index: 0,
      page_size: 100,
    }),
  })

  const options = useMemo(() => {
    return (data?.data || []).map((item) => ({
      label: `${item.order_code} - ${item.customer_id}`,
      value: item.id,
    }))
  }, [data?.data])

  return (
    <Select
      showSearch
      optionFilterProp="label"
      loading={isLoading}
      options={options}
      {...props}
    />
  )
}

export default Index
