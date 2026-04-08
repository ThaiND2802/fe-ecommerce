import request from '../../services/request'
import { GetFileUrlParams, IFileUploaded } from './types'

export const uploadFileMutation = ({
  data,
  apiUrl,
  skipApiError,
}: {
  data: FormData
  apiUrl: string
  skipApiError?: boolean
}) => {
  return request<IFileUploaded[]>({
    url: apiUrl,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
    timeout: 60000,
    showError: !skipApiError,
  })
}

export const getFileUrl = ({ apiUrl, params }: { apiUrl: string; params: GetFileUrlParams }) => {
  return request<string>({
    url: apiUrl,
    params,
  })
}

export const deleteFile = ({
  apiUrl,
  params,
  showError,
}: {
  apiUrl: string
  params: { path: string }
  showError?: boolean
}) => {
  return request<void>({
    url: apiUrl,
    method: 'DELETE',
    params,
    showError,
  })
}
