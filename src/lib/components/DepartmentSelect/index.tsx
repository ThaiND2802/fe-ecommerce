import { useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'

import Skeleton from '../SkeletonBlock'
import SelectSearch, { SelectSearchProps } from '../SelectSearch'
import { DepartmentListItem, departmentQueries } from '../../entities/department'

interface IProps extends SelectSearchProps<DepartmentListItem> {
  ignoreIds?: string[]
}

const Index = ({ ignoreIds, ...props }: IProps) => {
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery(
    departmentQueries.listInfinity(),
  )

  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, isFetchingNextPage])

  if (isLoading) {
    return <Skeleton active block />
  }

  return (
    <SelectSearch
      fieldNames={{ label: 'value', value: 'key' }}
      options={data}
      loading={isLoading}
      {...props}
    />
  )
}

export default Index
