import { Flex } from 'antd'
import cn from 'classnames'

import FileIcon from '../FileIcon'
import Icon from '../Icon'
import Ellipsis from '../Ellipsis'
import { FileLineItem } from '../../entities/files'
import { FileCompletedIcon, FileErrorIcon, FileUploadingIcon } from '../IconFileStatus'

import styles from './index.module.less'

export interface FileSelectProps {
  className?: string
  classNames?: {
    root?: string
    item?: string
  }
  value?: FileLineItem[]
  clickable?: boolean
  deletable?: boolean
  renderUploadStatus?: boolean
  onDelete?: (file: FileLineItem) => void
  onClick?: (e: React.MouseEvent<HTMLDivElement>, file: FileLineItem) => void
}

export interface FileItemProps {
  className?: string
  file: FileLineItem
  clickable?: boolean
  deletable?: boolean
  renderUploadStatus?: boolean
  onDelete?: () => void
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

const FileItem = ({
  className,
  file,
  clickable = true,
  deletable = true,
  renderUploadStatus = true,
  onDelete,
  onClick,
}: FileItemProps) => {
  const handleDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    onDelete?.()
  }

  const renderStatus = (file: FileLineItem) => {
    if (!renderUploadStatus) {
      return null
    }
    if (file.uploading) {
      return <FileUploadingIcon size={12} />
    }
    if (file.isError) {
      return <FileErrorIcon size={12} />
    }
    if (file.percent === 100) {
      return <FileCompletedIcon size={12} />
    }
    return null
  }

  return (
    <Flex
      className={cn(styles.fileItem, { [styles.clickable]: clickable }, className)}
      onClick={onClick}>
      <Flex className={styles.fileIconWrapper}>
        <FileIcon
          className={styles.fileIcon}
          fileExt={file.file_name.split('.').pop() || ''}
          size={28}
        />
      </Flex>
      <Flex className={styles.fileName}>
        <Ellipsis>{file.file_name}</Ellipsis>
        {renderStatus(file)}
      </Flex>

      {deletable && (
        <Flex className={styles.deleteIconWrapper} onClick={handleDelete}>
          <Icon className={styles.deleteIcon} name="delete" size={18} />
        </Flex>
      )}
    </Flex>
  )
}

const Index = ({
  value = [],
  className,
  classNames,
  clickable,
  deletable,
  renderUploadStatus,
  onDelete,
  onClick,
}: FileSelectProps) => {
  return (
    !!value.length && (
      <Flex className={cn(styles.fileList, className, classNames?.root)}>
        {value.map((file) => (
          <FileItem
            className={classNames?.item}
            key={file.id}
            file={file}
            clickable={clickable}
            deletable={deletable}
            renderUploadStatus={renderUploadStatus}
            onClick={(e) => onClick?.(e, file)}
            onDelete={() => onDelete(file)}
          />
        ))}
      </Flex>
    )
  )
}

export default Index
