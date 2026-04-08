import request, { PaginationParams, SystemRequestParams } from '../../services/request'
import {
  IStaffInfo,
  IJobPositionSelectItem,
  IJobUserInfo,
  IUserDetailInfo,
  IUserAndGroupInfo,
  UserGroupType,
  ICompanyInfo,
  IUserDetail,
  IUserMenuPermission,
  IUserByDepartmentInfo,
} from './types'

export interface GetUserListParams extends PaginationParams {
  module_id?: string
  ignore_ids?: string[]
  select_key?: string
}
export const getUserList = (params: GetUserListParams) => {
  return request<IStaffInfo[]>({
    url: '/user-management/api/v1/user/module/gets',
    method: 'GET',
    params: {
      ...params,
      module_id: params.module_id || SystemRequestParams.module_id,
    },
  })
}

export interface GetJobPositionSelectListParams extends PaginationParams {
  filter?: string
  select_key?: string
}
export const getJobPositionSelectList = (params: GetJobPositionSelectListParams) =>
  request<IJobPositionSelectItem[]>({
    url: 'staff/api/v1/job/select/gets',
    method: 'GET',
    params,
  })

interface GetUsersByJobsParams {
  job_ids: string[]
}
export const getUsersByJobs = (params: GetUsersByJobsParams) =>
  request<IJobUserInfo[]>({
    url: `/user-management/api/v1/user/job/gets`,
    method: 'POST',
    data: params,
  })

export const getUserDetail = (userId: string) =>
  request<IUserDetailInfo>({
    url: `/user-management/api/v1/user/detail/${userId}`,
    showError: false,
    commonError: false,
  })

export interface GetUserAndGroupByCompanyParams {
  tenantId?: string
  isShare?: boolean
}
export const getUserAndGroupByCompany = (params: GetUserAndGroupByCompanyParams) => {
  const url = params.isShare
    ? `/user-management/api/v1/user-picker/get-shared-user-group`
    : `/user-management/api/v1/user-picker/get-user-group`
  return request<IUserAndGroupInfo[]>({
    url,
    params: {
      module_id: SystemRequestParams.module_id,
      tenant_id: params.tenantId,
    },
  })
}

export const getUserByGroup = ({ groupId }: { groupId: string }) =>
  request<IUserAndGroupInfo[]>({
    url: `/user-management/api/v1/user-picker/get-user-by-group-id`,
    params: {
      module_id: SystemRequestParams.module_id,
      group_id: groupId,
    },
  })

export interface GetUserGroupInfoParams {
  items: {
    id: string
    tenant_id: string
    item_type: UserGroupType
  }[]
}
export const getUserGroupInfo = (params: GetUserGroupInfoParams) => {
  return request<IUserAndGroupInfo[]>({
    url: `/user-management/api/v1/user-picker/get-selected`,
    method: 'POST',
    data: {
      module_id: SystemRequestParams.module_id,
      ...params,
    },
  })
}

export const getCompanyList = ({ isShare }: { isShare?: boolean }) =>
  request<ICompanyInfo[]>({
    url: '/contact/api/v1/commons/companies-list',
    params: {
      picker_mode: isShare ? 0 : 1,
    },
  })

export const getUsersDetail = (userIds: string[]) =>
  request<IUserDetail[]>({
    url: '/user-management/api/v1/user/get-by-ids',
    method: 'POST',
    data: {
      ids: userIds,
    },
  })

export const getUserPermissions = () => {
  return request<{
    menuPermissions: IUserMenuPermission[]
  }>({
    url: `/user-management/api/v1/permission/current-user/gets`,
    params: {
      moduleId: SystemRequestParams.module_id,
    },
    showError: false,
  })
}

export interface GetUsersByDepartmentParams extends PaginationParams {
  DepartmentId: string
}
export const getUsersByDepartment = (params: GetUsersByDepartmentParams) => {
  return request<IUserByDepartmentInfo[]>({
    url: '/user-management/api/v1/user/department/gets',
    params,
  })
}
