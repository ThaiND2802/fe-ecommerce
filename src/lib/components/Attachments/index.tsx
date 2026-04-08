import { useImperativeHandle } from 'react'
import classNames from 'classnames'

import Text from '../Text'
import ShowMoreContainer from '../ShowMoreContainer'
import AttachmentCard from '../AttachmentCard'
import { FileLineItem, useFileDownloader, useFileUploader } from '../../entities/files'
import useLocale from '../../locales/useLocale'
import { formatFileSize } from '../../utils/file'
import i18n from '../../locales/i18n'

import styles from './index.module.less'

export interface AttachmentRef {
  browse: () => void
}

interface Props {
  className?: string
  editable?: boolean
  viewThreshold?: number
  maxSize?: number
  accept?: string
  allowDownloadAll?: boolean
  uploadApiUrl: string
  downloadApiUrl: string
  skipApiError?: boolean
  value?: FileLineItem[]
  onChange?: (files: FileLineItem[]) => void
  ref?: React.RefObject<AttachmentRef>
}

const Index = ({
  className,
  editable,
  viewThreshold,
  maxSize,
  accept,
  allowDownloadAll,
  uploadApiUrl,
  downloadApiUrl,
  skipApiError,
  value,
  onChange,
  ref,
}: Props) => {
  const [t] = useLocale('Attachments')
  const files = value

  const { browse, deleteFile } = useFileUploader({
    apiUrl: uploadApiUrl,
    skipApiError,
    files,
    multiple: true,
    maxSize,
    accept,
    onChange,
  })

  const fileDownloader = useFileDownloader(downloadApiUrl)

  const viewFile = (id: string) => {
    const fileInfo = files.find((file) => file.id === id)
    fileDownloader.view({ path: fileInfo.path })
  }

  const downloadAll = () => {}

  useImperativeHandle(ref, () => ({
    browse,
  }))

  if (!files?.length) return null

  return (
    <>
      <ShowMoreContainer
        className={classNames(styles.container, className)}
        maxItems={viewThreshold}
        items={
          files?.map((item) => ({
            id: item.id,
            fileName: item.file_name,
            fileSize: formatFileSize(item.size),
            uploading: item.uploading,
            isError: item.isError,
          })) || []
        }
        render={(items) => (
          <>
            {items.map((item) => (
              <AttachmentCard
                key={item.id}
                uploading={item.uploading}
                fileName={item.fileName}
                fileSize={item.fileSize.toString()}
                editable={editable}
                isError={item.isError}
                onDelete={() => {
                  deleteFile(item.id)
                }}
                onView={() => {
                  viewFile(item.id)
                }}
                onClick={() => {
                  viewFile(item.id)
                }}
              />
            ))}
          </>
        )}
      />
      {allowDownloadAll && !editable && files?.length > 1 && (
        <Text className={styles.downloadBtn} onClick={downloadAll}>
          {t.downloadAll}
        </Text>
      )}
    </>
  )
}

export default Index

export const successUploadValidator = (_: any, value: FileLineItem[]) => {
  const isUploading = value?.some(({ uploading, path }) => uploading && !path)
  if (isUploading) {
    return Promise.reject(new Error(i18n.t('Attachments.validation.fileUploading')))
  }
  const isError = value?.some(({ isError, path }) => isError && !path)
  if (isError) {
    return Promise.reject(new Error(i18n.t('Attachments.validation.fileUploadError')))
  }
  return Promise.resolve()
}
