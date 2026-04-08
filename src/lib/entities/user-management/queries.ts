import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query'

import { getNextPageParam } from '../../utils/query'
import {
  getCompanyList,
  getJobPositionSelectList,
  getUserAndGroupByCompany,
  GetUserAndGroupByCompanyParams,
  getUserGroupInfo,
  getUserList,
  getUsersByJobs,
  getUserByGroup,
  getUsersDetail,
  getUserPermissions,
  getUsersByDepartment,
} from './api'
import { IStaffInfo, UserGroupType } from './types'

export const userManagementQueries = {
  all: () => ['user-management'],

  usersKey: () => [...userManagementQueries.all(), 'get-users'],
  listUsersInfinity: () =>
    infiniteQueryOptions({
      queryKey: [...userManagementQueries.usersKey(), 'infinity'],
      queryFn: ({ pageParam }) => getUserList({ page_index: pageParam, page_size: 1000 }),
      getNextPageParam,
      initialPageParam: 0,
      select: (data) => data.pages.flatMap((page) => page.data) as IStaffInfo[],
    }),

  usersByDepartmentKey: () => [...userManagementQueries.all(), 'users-by-department'],
  getUsersByDepartment: (departmentId: string) =>
    queryOptions({
      queryKey: [...userManagementQueries.usersByDepartmentKey(), [departmentId]],
      queryFn: () =>
        getUsersByDepartment({ DepartmentId: departmentId, page_index: 0, page_size: 1000 }),
      select: (data) => data.data,
    }),

  jobPositionKey: () => [...userManagementQueries.all(), 'job-position'],
  listJobPositionInfinity: () =>
    infiniteQueryOptions({
      queryKey: [...userManagementQueries.jobPositionKey(), 'infinity'],
      queryFn: ({ pageParam }) =>
        getJobPositionSelectList({ page_index: pageParam, page_size: 1000 }),
      getNextPageParam,
      initialPageParam: 0,
      select: (data) => data.pages.flatMap((page) => page.data),
    }),

  jobUserKey: () => [...userManagementQueries.all(), 'job-user'],
  getUsersByJobs: (ids: string[]) =>
    queryOptions({
      queryKey: [...userManagementQueries.jobUserKey(), ids],
      queryFn: () => getUsersByJobs({ job_ids: ids }),
      select: (data) => data.data,
      enabled: ids.length > 0,
    }),

  companyKey: () => [...userManagementQueries.all(), 'company'],
  getCompanyList: (isShare?: boolean) =>
    queryOptions({
      queryKey: [...userManagementQueries.companyKey(), isShare],
      queryFn: () => getCompanyList({ isShare }),
      select: (data) => data.data,
    }),

  userGroupListKey: () => [...userManagementQueries.all(), 'user-group'],
  getUserGroupList: (params: GetUserAndGroupByCompanyParams) =>
    queryOptions({
      queryKey: [...userManagementQueries.userGroupListKey(), params],
      queryFn: () => getUserAndGroupByCompany(params),
      enabled: !!params.tenantId,
      select: (data) =>
        params.isShare
          ? data.data.map((item) => ({
              ...item,
              tenant_id: params.tenantId,
            }))
          : data.data,
    }),

  userGroupInfoKey: () => [...userManagementQueries.all(), 'user-group-info'],
  getUserGroupInfo: (
    data: { id: string; name: string; tenant_id: string; item_type: UserGroupType }[],
  ) =>
    queryOptions({
      queryKey: [...userManagementQueries.userGroupInfoKey(), data],
      queryFn: () => getUserGroupInfo({ items: data }),
      select: (data) => data.data,
      enabled: data?.filter((item) => !item.name).length > 0,
    }),

  memberByGroupKey: () => [...userManagementQueries.all(), 'member-by-group'],
  getMemberByGroup: (groupId: string) =>
    queryOptions({
      queryKey: [...userManagementQueries.memberByGroupKey(), groupId],
      queryFn: () => getUserByGroup({ groupId }),
      select: (data) => data.data,
      enabled: !!groupId,
    }),

  getMemberByGroupIds: (groupIds: string[], enabled: boolean) =>
    groupIds.map((groupId) => ({
      ...userManagementQueries.getMemberByGroup(groupId),
      enabled,
    })),

  userDetailKey: () => [...userManagementQueries.all(), 'user-detail'],
  getUserDetail: (userId: string) =>
    queryOptions({
      queryKey: [...userManagementQueries.userDetailKey(), [userId]],
      queryFn: () => getUsersDetail([userId]),
      select: (data) => data.data?.[0],
      enabled: !!userId,
    }),

  userPermissionsKey: () => [
    ...userManagementQueries.all(),
    'lang-independent',
    'user-permissions',
  ],
  getUserPermissions: () =>
    queryOptions({
      queryKey: [...userManagementQueries.userPermissionsKey()],
      queryFn: () => getUserPermissions(),
      select: (data) => data.data,
      staleTime: 60 * 60 * 1000,
    }),
}
