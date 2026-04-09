import request, { PaginationParams } from 'src/lib/services/request'
import { ProductItem } from './types'

export interface GetProductListParams extends PaginationParams {
  filter?: string
  sort_field?: string
  search_fields?: string
  ignore_ids?: string[]
  is_descending?: boolean
}

export const getProductList = (params: GetProductListParams) => {
  return request<ProductItem[]>({
    url: '/stationery/api/v1/products/gets',
    method: 'GET',
    params,
  })
}

export const getProductDetail = (id: string) => {
  return request<ProductItem>({
    url: `/stationery/api/v1/products/${id}`,
    method: 'GET',
  })
}

export interface CreateProductParams {
  id: string
  code: string
  name: string
  description: string
  unit: string
  price: number
  cost_price: number
  image_url: string
  category_id: string
  is_active: boolean
}

export const createProduct = (data: CreateProductParams) => {
  return request<string>({
    url: '/stationery/api/v1/products/create',
    method: 'POST',
    data,
  })
}

export interface UpdateProductParams extends CreateProductParams {
  original_id: string
}

export const updateProduct = (data: UpdateProductParams) => {
  return request<string>({
    url: '/stationery/api/v1/products/update',
    method: 'PUT',
    data,
  })
}

export const deleteProduct = (id: string) => {
  return request<string>({
    url: `/stationery/api/v1/products/delete/${id}`,
    method: 'DELETE',
  })
}
