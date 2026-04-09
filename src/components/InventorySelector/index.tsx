import { Select, SelectProps } from 'antd'
import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { inventoryQueries } from 'src/entities/management/inventory/queries'

type OptionType = {
  label: string
  value: string
}

const Index = (props: SelectProps<string, OptionType>) => {
  const { data, isLoading } = useQuery({
    ...inventoryQueries.list({
      page_index: 0,
      page_size: 100,
    }),
  })

  const options = useMemo(() => {
    return (data?.data || []).map((item) => ({
      label: `${item.id} - ${item.product_id}`,
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
