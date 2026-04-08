import { keepPreviousData, queryOptions } from '@tanstack/react-query'
import {
  getDownloadImportTemplate,
  getImportFields,
  uploadImportFile,
  IGetImportFieldsParams,
  IValidateImportParams,
  validateImport,
  getImportData,
  IGetImportDataParams,
} from './api'

import { FileLineItem } from '../../entities/files'

export const importQueries = {
  all: () => ['import'],

  downloadTemplate: ({ entity, apiUrl }: { entity: string; apiUrl: string }) =>
    queryOptions({
      queryKey: [...importQueries.all(), 'downloadTemplate', entity],
      queryFn: () => getDownloadImportTemplate({ entity, apiUrl }),
      select: (data) => data.data,
    }),

  getFileSheets: ({ apiUrl, file }: { apiUrl: string; file: FileLineItem }) => {
    const formData = new FormData()
    formData.append('file', file?.file)

    return queryOptions({
      queryKey: [...importQueries.all(), 'getFileSheets', file?.id],
      queryFn: () => uploadImportFile({ apiUrl, data: formData }),
      enabled: !!file?.id,
      select: (data) => data.data,
      staleTime: Infinity,
    })
  },

  getImportFields: ({ apiUrl, params }: { apiUrl: string; params: IGetImportFieldsParams }) => {
    return queryOptions({
      queryKey: [
        ...importQueries.all(),
        'getImportFields',
        params.entity_key,
        params.session_id,
        params.sheet_name,
        params.header_index,
      ],
      queryFn: () => getImportFields({ apiUrl, params }),
      select: (data) => data.data,
    })
  },

  getValidateImportData: ({
    apiUrl,
    params,
  }: {
    apiUrl: string
    params: IValidateImportParams
  }) => {
    return queryOptions({
      queryKey: [...importQueries.all(), 'getValidateImportData', params],
      queryFn: () => validateImport({ apiUrl, data: params }),
      select: (data) => data.data,
    })
  },

  getImportData: ({ apiUrl, params }: { apiUrl: string; params: IGetImportDataParams }) => {
    return queryOptions({
      queryKey: [...importQueries.all(), 'getImportData', params],
      queryFn: () => getImportData({ apiUrl, params }),
      select: (data) => ({
        ...data.data,
        data_list: data.data?.data_list?.map((item, index) => ({
          ...item,
          id: (params.page_index * params.page_size + index + 1) as unknown as string,
        })),
      }),
      placeholderData: keepPreviousData,
    })
  },
}
