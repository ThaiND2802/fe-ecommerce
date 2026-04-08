import request, { requestResponse } from '../../services/request'

import { IFileImportInfo, IImportFieldInfo, EImportType, EExportType } from './types'

export const getDownloadImportTemplate = ({
  entity,
  apiUrl,
}: {
  entity: string
  apiUrl: string
}) => {
  return requestResponse<any>({
    url: apiUrl,
    params: {
      entity_key: entity,
    },
    responseType: 'blob',
    showError: false,
  })
}

export const uploadImportFile = ({ apiUrl, data }: { apiUrl: string; data: FormData }) => {
  return request<IFileImportInfo>({
    url: apiUrl,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
    timeout: 30000,
  })
}

export interface IGetImportFieldsParams {
  // file_path: string
  entity_key: string
  session_id: string
  sheet_name: string
  header_index: number
}
export const getImportFields = ({
  apiUrl,
  params,
}: {
  apiUrl: string
  params: IGetImportFieldsParams
}) => {
  return request<IImportFieldInfo>({
    url: apiUrl,
    params,
    timeout: 30000,
  })
}

export interface IValidateImportParams {
  session_id: string
  field_map: {
    input_field: string
    target_field: string
    is_required: boolean
    data_type: string
  }[]
  mode: EImportType
  save_option: {
    replace_exist_data: boolean
    auto_fill_miss_language: boolean
  }
}
export interface IValidateImportResponse {
  total_count: number
  sucess_count: number
  error_count: number
}
export const validateImport = ({
  apiUrl,
  data,
}: {
  apiUrl: string
  data: IValidateImportParams
}) => {
  return request<IValidateImportResponse>({
    url: apiUrl,
    method: 'POST',
    data,
    showError: false,
  })
}

export interface IGetImportDataParams {
  session_id: string
  page_index: number
  page_size: number
}
export interface IImportDataResponse {
  column_info: [
    {
      [key: string]: string
    },
    {
      [key: string]: string
    },
  ]
  data_list: {
    [key: string]: string
  }[]
  pagination: {
    total_rows: number
    page_index: number
    page_size: number
    total_page: number
  }
}
export const getImportData = ({
  apiUrl,
  params,
}: {
  apiUrl: string
  params: IGetImportDataParams
}) => {
  return request<IImportDataResponse>({
    url: apiUrl,
    params,
  })
}

export interface IConfirmImportParams {
  session_id: string
}
export interface IConfirmImportResponse {
  sucess_count: number
  error_cout: number
  total_count: number
}
export const confirmImport = ({ apiUrl, data }: { apiUrl: string; data: IConfirmImportParams }) => {
  return request<IConfirmImportResponse>({
    url: apiUrl,
    method: 'POST',
    data,
  })
}

export interface IGetExportDataFileParams {
  session_id: string
  export_type: EExportType
}
export const getExportDataFile = ({
  apiUrl,
  params,
}: {
  apiUrl: string
  params: IGetExportDataFileParams
}) => {
  return request<string>({
    url: apiUrl,
    params,
    showError: false,
  })
}
