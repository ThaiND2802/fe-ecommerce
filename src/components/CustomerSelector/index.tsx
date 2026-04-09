import { Select, SelectProps } from 'antd'
import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { customerQueries } from 'src/entities/management/customer'

type OptionType = {
  label: string
  value: string
}

const Index = (props: SelectProps<string, OptionType>) => {
  const { data, isLoading } = useQuery({
    ...customerQueries.list({
      page_index: 0,
      page_size: 100,
    }),
  })

  const options = useMemo(() => {
    return (data?.data || []).map((item) => ({
      label: `${item.code} - ${item.name}`,
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
