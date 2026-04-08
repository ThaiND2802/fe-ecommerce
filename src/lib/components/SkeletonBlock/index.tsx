import { Skeleton, SkeletonProps } from 'antd'
import classNames from 'classnames'

import styles from './index.module.less'

interface IProps extends SkeletonProps {
  height?: number
  width?: number | string
  block?: boolean
}

const SkeletonBlock = ({ height, width, block, ...props }: IProps) => (
  <Skeleton.Button
    className={classNames(styles.component, { [styles.block]: block })}
    {...props}
    style={{ ...props.style, ...(height ? { height } : {}), ...(width ? { width } : {}) }}
  />
)

export default SkeletonBlock
