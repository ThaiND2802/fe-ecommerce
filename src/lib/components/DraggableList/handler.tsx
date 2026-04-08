import React from 'react'
import classNames from 'classnames'

import Icon from 'src/lib/components/Icon'
import styles from './index.module.less'

interface HandlerProps extends React.HTMLAttributes<HTMLDivElement> {
  iconSize?: number
}

const Index = ({ children, className, iconSize = 16, ...otherProps }: HandlerProps) => {
  return (
    <div className={classNames(styles.handler, className)} {...otherProps}>
      {children || <Icon name="handle" size={iconSize} />}
    </div>
  )
}

export default Index
