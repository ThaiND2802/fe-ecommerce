import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'

import { getEncryptedItem } from 'src/lib/utils/storage'

import { userManagementQueries } from './queries'
import { IMyInfo } from './types'

export const usePermission = ({
  enabled = true,
  check,
}: {
  enabled?: boolean
  check?: string[]
} = {}) => {
  const query = useQuery({
    ...userManagementQueries.getUserPermissions(),
    enabled,
  })

  const hasPermission = (permissions: string[]) =>
    !permissions?.length ||
    permissions?.every((permission) =>
      query.data?.menuPermissions?.some((item) => item.code === permission),
    )

  const granted = useMemo(() => {
    return !enabled || hasPermission(check)
  }, [query.data, enabled, check])

  return {
    ...query,
    menuPermissions: query.data?.menuPermissions,
    granted,
    hasPermission,
  }
}

export const useMyInfo = () => {
  return getEncryptedItem('user') as IMyInfo
}
