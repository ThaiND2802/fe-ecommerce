import request, { PaginationParams } from 'src/lib/services/request'
import { UserItem } from './types'

export interface GetUserListParams extends PaginationParams {
  filter?: string
  sort_field?: string
  search_fields?: string
  ignore_ids?: string[]
  is_descending?: boolean
}

export const getUserList = (params: GetUserListParams) => {
  return request<UserItem[]>({
    url: '/stationery/api/v1/users/gets',
    method: 'GET',
    params,
  })
}

export const getUserDetail = (id: string) => {
  return request<UserItem>({
    url: `/stationery/api/v1/users/${id}`,
    method: 'GET',
  })
}

export interface CreateUserParams {
  id: string
  full_name: string
  email: string
  phone: string
  image: string
  gender: string
  date_of_birth: string
  address: string
  department_id: string
  position_id: string
  job_title_id: string
  avatar_url: string
  hire_date: string
  refresh_token: string
  refresh_token_expiry_time: string
  is_active: string
}

export const createUser = (data: CreateUserParams) => {
  return request<string>({
    url: '/stationery/api/v1/users/create',
    method: 'POST',
    data,
  })
}

export interface UpdateUserParams extends CreateUserParams {
  original_id: string
}

export const updateUser = (data: UpdateUserParams) => {
  return request<string>({
    url: '/stationery/api/v1/users/update',
    method: 'PUT',
    data,
  })
}

export const deleteUser = (id: string) => {
  return request<string>({
    url: `/stationery/api/v1/users/delete/${id}`,
    method: 'DELETE',
  })
}
