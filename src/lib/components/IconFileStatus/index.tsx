import { LoadingOutlined } from '@ant-design/icons'
import classNames from 'classnames'

import Icon from '../Icon'
import IconSax from '../IconSax'
import styles from './index.module.less'

interface FileStatusIconProps {
  className?: string
  size?: number
}

export const FileUploadingIcon = ({ className, size = 16 }: FileStatusIconProps) => {
  return <LoadingOutlined size={size} spin className={classNames(className)} />
}

export const FileCompletedIcon = ({ className, size = 16 }: FileStatusIconProps) => {
  return <Icon name="checks" size={size} className={classNames(styles.completedIcon, className)} />
}

export const FileErrorIcon = ({ className, size = 16 }: FileStatusIconProps) => {
  return (
    <IconSax name="not-allowed-3" size={size} className={classNames(styles.errorIcon, className)} />
  )
}
