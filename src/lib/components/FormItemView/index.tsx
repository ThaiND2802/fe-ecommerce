import { FlexProps, Flex } from 'antd'
import cn from 'classnames'

import SkeletonBlock from '../SkeletonBlock'
import styles from './index.module.less'

interface IProps extends FlexProps {
  label?: string
  subLabel?: React.ReactNode
  loading?: boolean
  inline?: boolean
  colon?: boolean
  skeleton?: React.ReactNode
  children: React.ReactNode
  classNames?: {
    root?: string
    label?: string
  }
}

const Index = ({
  className,
  children,
  label,
  subLabel,
  skeleton,
  loading,
  colon = false,
  inline = false,
  classNames,
  ...otherProps
}: IProps) => {
  const skeletonComp = skeleton || <SkeletonBlock height={22} block active />

  return (
    <Flex
      className={cn(styles.container, { [styles.inline]: inline }, classNames?.root, className)}
      {...otherProps}>
      <div className={cn(styles.label, 'form-field-label', classNames?.label)}>
        {label}
        {colon && ':'}
        {subLabel}
      </div>

      {loading ? skeletonComp : children}
    </Flex>
  )
}

export default Index
