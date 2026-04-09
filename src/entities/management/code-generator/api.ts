import request, { PaginationParams } from 'src/lib/services/request'
import { CodeGeneratorItem } from './types'

export interface GetCodeGeneratorListParams extends PaginationParams {
  filter?: string
  sort_field?: string
  search_fields?: string
  ignore_ids?: string[]
  is_descending?: boolean
}

export const getCodeGeneratorList = (params: GetCodeGeneratorListParams) => {
  return request<CodeGeneratorItem[]>({
    url: '/stationery/api/v1/code-generators/gets',
    method: 'GET',
    params,
  })
}

export const getCodeGeneratorDetail = (id: string) => {
  return request<CodeGeneratorItem>({
    url: `/stationery/api/v1/code-generators/${id}`,
    method: 'GET',
  })
}

export interface CreateCodeGeneratorParams {
  id: string
  prefix: string
  last_number: number
}

export const createCodeGenerator = (data: CreateCodeGeneratorParams) => {
  return request<string>({
    url: '/stationery/api/v1/code-generators/create',
    method: 'POST',
    data,
  })
}

export interface UpdateCodeGeneratorParams extends CreateCodeGeneratorParams {
  original_id: string
}

export const updateCodeGenerator = (data: UpdateCodeGeneratorParams) => {
  return request<string>({
    url: '/stationery/api/v1/code-generators/update',
    method: 'PUT',
    data,
  })
}

export const deleteCodeGenerator = (id: string) => {
  return request<string>({
    url: `/stationery/api/v1/code-generators/delete/${id}`,
    method: 'DELETE',
  })
}
