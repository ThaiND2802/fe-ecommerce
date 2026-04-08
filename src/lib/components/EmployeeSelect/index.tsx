import { useQuery } from '@tanstack/react-query'

import Skeleton from '../SkeletonBlock'
import MemberSelect, { MemberSelectProps } from '../MemberSelect'
import { IStaffInfo, userManagementQueries } from '../../entities/user-management'

interface IProps extends MemberSelectProps {
  departmentId?: string
  searchPlaceholder?: string
  ignoreIds?: string[]
  enabled?: boolean
}

const Index = ({
  enabled = true,
  ignoreIds,
  departmentId,
  searchPlaceholder,
  ...props
}: IProps) => {
  const { data, isLoading } = useQuery({
    ...userManagementQueries.getUsersByDepartment(departmentId),
    enabled,
  })

  if (isLoading) {
    return <Skeleton active block />
  }

  return (
    <MemberSelect
      options={
        data?.map((item) => ({
          user_id: item.id,
          image: item.image,
          full_name: item.full_name,
          email: item.email,
        })) as IStaffInfo[]
      }
      isLoading={isLoading}
      searchPlaceholder={searchPlaceholder}
      {...props}
    />
  )
}

export default Index
