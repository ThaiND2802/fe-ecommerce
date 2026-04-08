import { UploadFile } from 'antd'
import { UploadChangeParam } from 'antd/lib/upload'

import FileDrop from '../FileDrop'
import { FileLineItem, useFileUploader, useFileDownloader } from '../../entities/files'

import FileList from '../FileList'

export interface FileSelectProps {
  accept?: string
  maxSize?: number
  multiple?: boolean
  value?: FileLineItem[]
  clickable?: boolean
  deletable?: boolean
  autoHideUpload?: boolean
  hideUpload?: boolean
  uploadApiUrl?: string
  downloadApiUrl?: string
  autoUpload?: boolean
  skipApiError?: boolean
  onChange?: (files: FileLineItem[]) => void
}

const Index = ({
  value = [],
  accept,
  maxSize,
  multiple,
  clickable,
  deletable,
  autoHideUpload,
  hideUpload,
  uploadApiUrl,
  downloadApiUrl,
  autoUpload = true,
  skipApiError,
  onChange,
}: FileSelectProps) => {
  const files = value
  const { add, addUpload, deleteFile } = useFileUploader({
    apiUrl: uploadApiUrl,
    files,
    multiple: true,
    maxSize,
    accept,
    skipApiError,
    onChange,
  })

  const fileDownloader = useFileDownloader(downloadApiUrl)

  const onFileChange = (files: UploadChangeParam<UploadFile>) => {
    const listFiles = files.fileList.map(({ originFileObj }) => originFileObj)
    if (autoUpload) {
      addUpload?.(listFiles)
    } else {
      add(listFiles, !multiple)
    }
  }

  const onDelete = (file: FileLineItem) => {
    deleteFile(file.id)
  }

  const viewFile = (_, file: FileLineItem) => {
    fileDownloader.view({ path: file.path, file_name: file.file_name })
  }

  return (
    <>
      <FileList
        value={value}
        clickable={clickable}
        deletable={deletable}
        renderUploadStatus={autoUpload}
        onDelete={onDelete}
        onClick={viewFile}
      />

      {(!value.length || !autoHideUpload) && !hideUpload && (
        <FileDrop accept={accept} multiple={multiple} onChange={onFileChange} maxSize={maxSize} />
      )}
    </>
  )
}

export default Index
