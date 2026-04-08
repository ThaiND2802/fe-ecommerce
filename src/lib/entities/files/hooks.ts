import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import useLocale from '../../locales/useLocale'
import useMessage from '../../hooks/message'
import { getFileUrl, uploadFileMutation } from './api'
import { IFileUploaded, FileLineItem, GetFileUrlParams } from './types'

const MUTATIONS = {
  UPLOAD_FILE: 'UPLOAD_FILE',
}

const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replaceAll(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | Math.trunc(0),
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

const parseFileLineItem = (file: File): FileLineItem => {
  return {
    id: uuid(),
    file_name: file.name,
    size: file.size,
    percent: 0,
    isNew: true,
    uploading: true,
    file,
    path: undefined,
  }
}

const useUploadFileMutation = ({
  temp,
  apiUrl,
  skipApiError,
  onSuccess,
  onError,
}: {
  temp?: boolean
  apiUrl: string
  skipApiError?: boolean
  onSuccess: (data: IFileUploaded[], variables: any) => void
  onError: (error: Error, variables: any) => void
}) => {
  return useMutation({
    mutationKey: [MUTATIONS.UPLOAD_FILE],
    mutationFn: (files: FileLineItem[]) => {
      const formData = new FormData()
      files.forEach((file) => {
        formData.append('files', file.file)
      })
      formData.append('is_temp', temp ? 'true' : 'false')

      return uploadFileMutation({
        data: formData,
        apiUrl,
        skipApiError,
      })
    },
    onSuccess: (response, variables) => {
      onSuccess(response.data, variables)
    },
    onError: (error, variables) => {
      onError(error, variables)
    },
  })
}

const useFileUploaderManager = ({
  files,
  accept,
  maxSize,
  multiple,
  chunkSize,
  onUploadFile,
  onChange,
}: {
  files?: FileLineItem[]
  accept?: string
  maxSize?: number
  multiple: boolean
  chunkSize?: number
  initialFiles?: FileLineItem[]
  onUploadFile: (file: FileLineItem[]) => void
  onChange?: (files: FileLineItem[]) => void
}) => {
  const [t] = useLocale('FileUploader')
  const { message } = useMessage()

  const isValidFiles = (file: File[]) => {
    const overSizeFiles = []
    const invalidFiles = []

    file.forEach((f) => {
      const fileExtension = f.name.split('.').pop().toLowerCase()

      if (accept && !accept.includes(fileExtension)) {
        invalidFiles.push(f)
      }

      if (maxSize && f.size > maxSize) {
        overSizeFiles.push(f)
      }
    })

    const errorMessage = [
      invalidFiles.length
        ? `${t.errors.fileInvalid} (${invalidFiles.map((f) => f.name).join(', ')})`
        : '',
      overSizeFiles.length
        ? `${t.errors.fileSizeExceeded} (${overSizeFiles.map((f) => f.name).join(', ')})`
        : '',
    ].join('\n')

    return {
      isValid: !overSizeFiles.length && !invalidFiles.length,
      message: errorMessage,
    }
  }

  const [fileInput] = useState(() => {
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.multiple = multiple
    fileInput.accept = accept || ''

    const div = document.createElement('div')
    div.appendChild(fileInput)
    div.style.width = '1px'
    div.style.height = '1px'
    div.style.position = 'absolute'
    div.style.left = '-1px'
    div.style.top = '0px'
    div.style.opacity = '0'
    div.style.overflow = 'hidden'

    document.body.appendChild(div)

    return fileInput
  })

  const browse = () => {
    fileInput.click()
  }

  const add = (fileList: File[], newAdd = false) => {
    const fileValidInfo = isValidFiles(fileList)
    fileInput.value = ''

    if (!fileValidInfo.isValid) {
      message.error(fileValidInfo.message)
      return
    }
    const newFiles = fileList.map((file) => parseFileLineItem(file))
    onChange?.(newAdd ? newFiles : [...(files || []), ...newFiles])
    return newFiles
  }

  const addUpload = (fileList: File[]) => {
    const newFiles = add(fileList)

    let chunks = []
    let addedSize = 0
    for (const file of newFiles) {
      chunks.push(file)
      addedSize += file.size

      if (chunkSize && addedSize >= chunkSize) {
        onUploadFile(chunks)
        chunks = []
        addedSize = 0
      }
    }

    if (chunks.length > 0) {
      onUploadFile(chunks)
    }
  }

  const deleteFile = (id: string) => {
    onChange?.(files?.filter((f) => f.id !== id))
  }

  useEffect(() => {
    const onFileChange = (e: Event) => {
      const selectingFiles = Array.from((e.target as HTMLInputElement).files)
      addUpload(selectingFiles)
    }
    fileInput.addEventListener('change', onFileChange)

    return () => {
      fileInput.removeEventListener('change', onFileChange)
    }
  }, [files, fileInput])

  useEffect(() => {
    return () => {
      if (fileInput?.parentElement) {
        fileInput.parentElement.remove()
      }
    }
  }, [])

  return {
    files,
    browse,
    add,
    addUpload,
    deleteFile,
    isValidFiles,
  }
}

export interface UseFileUploaderProps {
  files?: FileLineItem[]
  temp?: boolean
  multiple: boolean
  accept?: string
  maxSize?: number
  chunkSize?: number
  apiUrl: string
  skipApiError?: boolean
  onUploadSuccess?: (file: IFileUploaded[]) => void
  onUploadError?: (error: Error) => void
  onChange?: (files: FileLineItem[]) => void
}
export const useFileUploader = ({
  files,
  temp = true,
  multiple,
  accept,
  maxSize,
  apiUrl,
  skipApiError,
  onUploadSuccess,
  onUploadError,
  onChange,
}: UseFileUploaderProps) => {
  const { browse, deleteFile, add, addUpload, isValidFiles } = useFileUploaderManager({
    files,
    accept,
    maxSize,
    multiple,
    onUploadFile: (files) => {
      uploadFile(files)
    },
    onChange,
  })

  const { mutate: uploadFile, isPending: isUploading } = useUploadFileMutation({
    temp,
    apiUrl,
    skipApiError,
    onSuccess: (data, variables) => {
      const uploadingFiles = variables.reduce((acc, curr) => {
        acc[curr.id] = curr
        return acc
      }, {})

      onChange?.(
        files.map((f) => ({
          ...f,
          ...(uploadingFiles[f.id] && {
            path: data.find(({ file_name }) => file_name === f.file_name)?.path,
            percent: 100,
            isError: false,
            uploading: false,
          }),
        })),
      )
      if (onUploadSuccess) {
        onUploadSuccess(data)
      }
    },
    onError: (error, variables) => {
      const uploadingFiles = variables.reduce((acc, curr) => {
        acc[curr.id] = curr
        return acc
      }, {})
      onChange?.(
        files.map((f) => ({
          ...f,
          ...(uploadingFiles[f.id] && {
            isError: true,
            uploading: false,
          }),
        })),
      )
      if (onUploadError) {
        onUploadError(error)
      }
    },
  })

  return {
    isUploading,
    browse,
    add,
    addUpload,
    deleteFile,
    isValidFiles,
  }
}

export const useFileDownloader = (apiUrl: string) => {
  const [c] = useLocale('common')
  const { message, apiFailed } = useMessage()
  const openUrl = (url: string) => {
    const link = document.createElement('a')
    link.href = url
    link.target = '_blank'
    link.click()
  }

  const download = (params: GetFileUrlParams, silent = false) => {
    if (!silent) {
      message.open({
        type: 'loading',
        content: c.message.downloading,
        duration: 0,
      })
    }
    getFileUrl({
      apiUrl,
      params,
    })
      .then((res) => {
        if (res?.data) {
          openUrl(res.data)
        } else {
          apiFailed()
        }
      })
      .catch(() => {
        apiFailed()
      })
      .finally(() => {
        message.destroy()
      })
  }

  const view = (params: GetFileUrlParams, silent = false) => {
    download(params, silent)
  }

  return {
    download,
    view,
  }
}
