import { useState } from 'react'
import { Flex, Spin } from 'antd'
import classNames from 'classnames'

import FileIcon from '../FileIcon'
import Ellipsis from '../Ellipsis'
import IconSax from '../IconSax'
import Icon from '../Icon'
import { ActionIcon } from '../ActionIcon'

import styles from './index.module.less'

interface FileCardProps {
  fileName: string
  fileSize: string
  editable?: boolean
  uploading?: boolean
  isError?: boolean
  onDelete?: () => void
  onView?: () => void
  onClick?: () => void
}

const Index = ({
  fileName,
  fileSize,
  editable = false,
  uploading = false,
  isError = false,
  onDelete,
  onView,
  onClick,
}: FileCardProps) => {
  const extension = fileName.split('.').pop() || ''
  const name = fileName.replace(`.${extension}`, '')

  const [overlayVisible, setOverlayVisible] = useState(false)

  const openOverlay = () => {
    if (editable) {
      setOverlayVisible(true)
    }
  }

  const closeOverlay = () => {
    setTimeout(() => {
      setOverlayVisible(false)
    }, 100)
  }

  const handleClick = () => {
    if (editable) {
      return
    }
    onClick?.()
  }

  return (
    <Spin spinning={uploading}>
      <Flex
        className={classNames(styles.card, {
          [styles.error]: isError,
          [styles.clickable]: !editable,
        })}
        tabIndex={0}
        onFocus={openOverlay}
        onBlur={closeOverlay}
        onMouseEnter={openOverlay}
        onMouseLeave={closeOverlay}
        onClick={handleClick}>
        <FileIcon className={styles.fileIcon} fileExt={extension} size={28} />
        <Flex className={styles.fileInfo}>
          <Flex>
            <Ellipsis className={styles.fileName} title={fileName}>
              {name}
            </Ellipsis>
            <span className={styles.fileExtension} title={fileName}>
              .{extension}
            </span>
          </Flex>
          <span className={styles.fileSize}>{fileSize}</span>
        </Flex>

        {overlayVisible && (
          <Flex className={styles.overlay}>
            <ActionIcon className={styles.icon} onClick={onView}>
              <IconSax name="eye" />
            </ActionIcon>
            <ActionIcon className={styles.icon} onClick={onDelete}>
              <Icon name="delete" />
            </ActionIcon>
          </Flex>
        )}
      </Flex>
    </Spin>
  )
}

export default Index
