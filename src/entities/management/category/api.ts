import request, { PaginationParams } from 'src/lib/services/request'
import { CategoryItem, ItemStatus } from './types'

export interface GetCategoryListParams extends PaginationParams {
  filter?: string
  sort_field?: string
  search_fields?: string
  ignore_ids?: string[]
  is_descending?: boolean
}

export const getCategoryList = (params: GetCategoryListParams) => {
  return request<CategoryItem[]>({
    url: '/stationery/api/v1/categories/gets',
    method: 'GET',
    params,
  })
}

export const getCategoryDetail = (id: string) => {
  return request<CategoryItem>({
    url: `/stationery/api/v1/categories/${id}`,
    method: 'GET',
  })
}

export interface CreateCategoryParams {
  id: string
  name: string
  description: string
  status: ItemStatus
}

export const createCategory = (data: CreateCategoryParams) => {
  return request<string>({
    url: '/stationery/api/v1/categories/create',
    method: 'POST',
    data,
  })
}

export interface UpdateCategoryParams extends CreateCategoryParams {
  original_id: string
}

export const updateCategory = (data: UpdateCategoryParams) => {
  return request<string>({
    url: '/stationery/api/v1/categories/update',
    method: 'PUT',
    data,
  })
}

export const deleteCategory = (id: string) => {
  return request<string>({
    url: `/stationery/api/v1/categories/delete/${id}`,
    method: 'DELETE',
  })
}
