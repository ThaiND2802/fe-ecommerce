import { FlexProps, Flex } from 'antd'
import classNames from 'classnames'

import styles from './index.module.less'
import SkeletonBlock from '../SkeletonBlock'

interface IProps extends FlexProps {
  icon?: React.ReactNode
  contentClassName?: string
  iconClassName?: string
  loading?: boolean
  skeleton?: React.ReactNode
  skeletonHeight?: number
  noMargin?: boolean
}

const Index = ({
  className,
  icon,
  contentClassName,
  iconClassName,
  style,
  loading,
  skeleton,
  skeletonHeight = 22,
  noMargin,
  ...otherProps
}: IProps) => {
  const skeletonComp = skeleton || <SkeletonBlock height={skeletonHeight} block active />

  return (
    <Flex
      className={classNames(styles.container, className, { [styles.noMargin]: noMargin })}
      style={style}>
      <div className={classNames(styles.icon, iconClassName)}>{icon}</div>
      {loading ? (
        <Flex className={classNames(styles.content, contentClassName)} {...otherProps}>
          {skeletonComp}
        </Flex>
      ) : (
        <Flex className={classNames(styles.content, contentClassName)} {...otherProps} />
      )}
    </Flex>
  )
}

export default Index
