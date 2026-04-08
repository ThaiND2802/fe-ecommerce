import React from 'react'
import classNames from 'classnames'

import styles from './index.module.less'

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  full?: boolean
  line?: number
  children: React.ReactNode
}

const Ellipsis = ({ children, className, full, line = 1, style, ...props }: IProps) => (
  <div
    className={classNames(className, full ? styles.full : styles.ellipsis)}
    style={{
      lineClamp: line,
      WebkitLineClamp: line,
      ...(line === 1 ? { whiteSpace: 'nowrap' } : {}),
      ...style,
    }}
    title={typeof children === 'string' ? children : ''}
    {...props}>
    {children}
  </div>
)

export default Ellipsis
