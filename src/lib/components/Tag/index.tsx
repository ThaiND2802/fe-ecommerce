import { Tag as AntdTag, TagProps as AntdTagProps } from 'antd'
import classNames from 'classnames'

import styles from './index.module.less'

export interface TagProps extends Omit<AntdTagProps, 'color'> {
  color?:
    | 'green'
    | 'red'
    | 'purple'
    | 'blue'
    | 'white'
    | 'gray'
    | 'pink'
    | 'yellow'
    | 'orange'
    | 'light-gray'
  noBorder?: boolean
  noBackground?: boolean
  flexCenter?: boolean
}

const Tag = ({
  className,
  color = 'gray',
  noBorder,
  noBackground,
  flexCenter,
  ...otherProps
}: TagProps) => {
  return (
    <AntdTag
      className={classNames(className, styles.component, color, {
        [styles.noBorder]: noBorder,
        [styles.noBackground]: noBackground,
        [styles.flexCenter]: flexCenter,
      })}
      color={color}
      {...otherProps}
    />
  )
}

export default Tag
