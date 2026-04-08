import { useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'

import SkeletonBlock from '../SkeletonBlock'
import MemberSelect, { MemberSelectProps } from '../MemberSelect'
import useLocale from '../../locales/useLocale'
import { userManagementQueries, IStaffInfo } from '../../entities/user-management'

interface IProps extends MemberSelectProps {
  skeleton?: boolean
  onLoadData?: (value: IStaffInfo[]) => void
}

const Index = ({
  placeholder,
  searchPlaceholder,
  skeleton = true,
  onLoadData,
  ...otherProps
}: IProps) => {
  const [t] = useLocale('InlineMemberSelector')
  const { isLoading, data, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery(
    userManagementQueries.listUsersInfinity(),
  )

  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, isFetchingNextPage])

  useEffect(() => {
    if (data) {
      onLoadData?.(data)
    }
  }, [data])

  if (skeleton && isLoading) {
    return (
      <SkeletonBlock
        active
        block
        height={otherProps.size === 'large' || otherProps.mode === 'multiple' ? 50 : 30}
      />
    )
  }

  return (
    <MemberSelect
      options={data}
      isLoading={isLoading}
      placeholder={placeholder || t.placeholder}
      searchPlaceholder={searchPlaceholder || t.searchPlaceholder}
      {...otherProps}
    />
  )
}

export default Index
export type { IStaffInfo } from '../../entities/user-management/types'
