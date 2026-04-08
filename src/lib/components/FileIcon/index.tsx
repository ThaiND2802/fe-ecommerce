import { HTMLAttributes } from 'react'
import { Flex } from 'antd'
import classNames from 'classnames'

import IconSax from '../IconSax'
import {
  PdfIcon,
  XslIcon,
  PptIcon,
  DocIcon,
  GifIcon,
  PngIcon,
  JpgIcon,
  DocxIcon,
  CsvIcon,
} from './icons'

import styles from './index.module.less'

export interface FileIconProps extends HTMLAttributes<HTMLDivElement> {
  fileExt?: string
  fileName?: string
  size?: number
}

const Icons = {
  pdf: PdfIcon,
  xls: XslIcon,
  xlsx: XslIcon,
  ppt: PptIcon,
  doc: DocIcon,
  docx: DocxIcon,
  gif: GifIcon,
  jpg: JpgIcon,
  png: PngIcon,
  csv: CsvIcon,
}

const FileIcon = ({ className, fileExt, fileName, size = 24, ...props }: FileIconProps) => {
  let iconName = fileExt
  if (!iconName && fileName) {
    iconName = fileName.split('.').pop()?.toLowerCase()
  }
  const IconComponent = Icons[iconName]

  if (IconComponent) {
    return (
      <Flex className={classNames(styles.container, className)} {...props}>
        <IconComponent />
      </Flex>
    )
  }

  return <IconSax name="document-1" size={size} />
}

export default FileIcon
