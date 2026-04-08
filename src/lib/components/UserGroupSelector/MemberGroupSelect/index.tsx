import { useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'

import StackMemberSelect, {
  MemberType,
  StackMemberSelectProps,
} from '../../../components/StackMemberSelect'
import Skeleton from '../../../components/SkeletonBlock'
import {
  userManagementQueries,
  IUserAndGroupInfo,
  UserGroupType,
  UserStatus,
} from '../../../entities/user-management'

const CurrentTenantId = import.meta.env.VITE_APP_TENANT_ID

export interface MemberSelectProps extends StackMemberSelectProps {
  tenantId?: string
  isShare?: boolean
  value?: IUserAndGroupInfo[]
  onChange?: (value: IUserAndGroupInfo[]) => void
  onLoadData?: (value: IUserAndGroupInfo[]) => void
}

const MemberTypeMap = {
  [UserGroupType.USER]: MemberType.USER,
  [UserGroupType.USER_GROUP]: MemberType.USER_GROUP,
  [UserGroupType.LINKED_GROUP]: MemberType.LINKED_GROUP,
  [UserGroupType.TENANT]: MemberType.TENANT,
}

const Index = ({ tenantId, isShare, value, onChange, onLoadData, ...props }: MemberSelectProps) => {
  const { data, isLoading } = useQuery(
    userManagementQueries.getUserGroupList({ tenantId: tenantId || CurrentTenantId, isShare }),
  )

  const { data: userGroupInfo } = useQuery(
    userManagementQueries.getUserGroupInfo(
      value?.map((item) => ({
        id: item.id,
        name: item.name,
        tenant_id: item.tenant_id,
        item_type: item.item_type,
      })) ?? [],
    ),
  )

  const dataMap = useMemo(() => {
    return data?.reduce((acc, item) => {
      acc[item.id] = item
      return acc
    }, {})
  }, [data])

  const handleChange = (value: string[]) => {
    onChange?.(value.map((item) => dataMap[item]))
  }

  useEffect(() => {
    if (userGroupInfo) {
      onLoadData?.(userGroupInfo)
    }
  }, [userGroupInfo])

  if (isLoading) {
    return <Skeleton active block height={46} />
  }

  return (
    <StackMemberSelect
      fieldNames={{ label: 'name', value: 'id' }}
      value={value?.map((item: IUserAndGroupInfo) => item.id)}
      options={(data || value)?.map((item: IUserAndGroupInfo) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        jobName: item.job,
        image: item.image,
        memberCount: item.member_count,
        isExpired: item.user_status === UserStatus.INACTIVE,
        type: MemberTypeMap[item.item_type],
      }))}
      loading={isLoading}
      onChange={handleChange}
      {...props}
    />
  )
}

export default Index
