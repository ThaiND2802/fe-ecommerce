import { useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'

import SkeletonBlock from '../SkeletonBlock'
import SelectSearch, { SelectSearchProps } from '../SelectSearch'
import { userManagementQueries, IJobPositionSelectItem } from '../../entities/user-management'

interface IProps extends SelectSearchProps<IJobPositionSelectItem> {}

const Index = ({ ...otherProps }: IProps) => {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery(
    userManagementQueries.listJobPositionInfinity(),
  )

  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, isFetchingNextPage])

  if (isLoading) {
    return <SkeletonBlock active block />
  }
  return (
    <SelectSearch
      options={data}
      loading={isLoading}
      fieldNames={{ label: 'value', value: 'key' }}
      {...otherProps}
    />
  )
}

export default Index
