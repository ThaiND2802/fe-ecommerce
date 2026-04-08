export enum UserGroupType {
  USER_GROUP = 1,
  LINKED_GROUP = 2,
  USER = 3,
  TENANT = 4,
}
export enum UserStatus {
  ACTIVE = 1,
  INACTIVE = 2,
}

export interface IStaffInfo {
  department_id: string
  department_name: string
  email: string
  full_name: string
  image: null
  job: string
  job_id: string
  phone_number: string
  staff_code: string
  staff_id: string
  user_id: string
  user_name: string
}

export interface IJobPositionSelectItem {
  key: string
  value: string
}

export interface IJobUserInfo {
  id: string
  user_name: string
  staff_id: string
  staff_code: string
  full_name: string
  department_id: string
  department_name: string
  email: string
  phone_number: string
  image: string
  item_status: number
  job_id: string
  job: string
  position_id: string
  position: string
  created_at: string
  signature: string
}

export interface IUserDetailInfo {
  id: string
  user_name: string
  email: string
  phone_number: string
  is_active: true
  group_names: string[]
  license_key: string[]
  item_license: {
    id: string
    license_id: string
    module_name: string
    module_id: string
  }[]
}

export interface IUserAndGroupInfo {
  id: string
  name: string
  email: string
  item_type: UserGroupType
  image: string
  job: string
  department_name: string
  user_status: UserStatus
  member_count: number
  expired_count: number
  tenant_id?: string // added by query
}

export interface ICompanyInfo {
  company_id: string
  company_name: string
  company_code: string
  parent_code: string
}

export interface IUserDetail {
  id: string
  user_name: string
  staff_id: string
  staff_code: string
  full_name: string
  department_id: string
  department_name: string
  email: string
  phone_number: string
  image: string
  item_status: number
  job_id: string
  job: string
  position_id: string
  position: string
  created_at: string
  signature: string
}

export enum EPermissionType {
  MENU = 'MENU',
}

export interface IUserMenuPermission {
  code: string
  created_at: string
  created_by: string
  description: string
  group_id: string
  group_name: string
  id: string
  item_status: number
  level: number
  module_id: string
  module_name: string
  path_urls: number
  permission_type: EPermissionType.MENU
  permission_type_name: string
  title: string
  updated_at: string
  updated_by: string
}

export interface IMyInfo {
  companyName: string
  id: string
  userId: string
  fullName: string
  image: string
  jobId: string
  job: string
  departmentId: string
  department: string
  positionId: string
  position: string
  ext: string
  phone: string
  managerId: string
  manager: string
  email: string
  startDate: string
  statusId: string
  status: string
  gender: string
  annualLeave: number
  signature: string
  tenant: string
}

export interface IUserByDepartmentInfo {
  id: string
  company_name: string
  created_at: string
  department_id: null
  department_name: string
  email: string
  full_name: string
  group_id: string
  image: string
  item_status: number
  job: string
  job_id: string
  language: string
  phone_number: string
  position: string
  position_id: string
  signature: string
  staff_code: string
  staff_id: string
  staff_language: string
  user_name: string
}
