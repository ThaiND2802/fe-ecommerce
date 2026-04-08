export interface IFileUploaded {
  path: string
  file_name: string
  size: number
}

export interface FileLineItem {
  id?: string
  file_name: string
  size: number
  path: string
  percent?: number
  isNew?: boolean
  isError?: boolean
  uploading?: boolean
  errorMessage?: string
  file?: File
}

export type GetFileUrlParams = {
  path: string
  file_name?: string
  [key: string]: any
}
