import React from 'react'
import cn from 'classnames'

import styles from './css-normalize-wrapper.module.less'

interface CssNormalizeWrapperProps extends React.ComponentProps<'div'> {}

const CssNormalizeWrapper = ({ className, children, ...props }: CssNormalizeWrapperProps) => {
  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      {children}
    </div>
  )
}

export default CssNormalizeWrapper
