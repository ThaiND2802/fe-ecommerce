import { HTMLAttributes } from 'react'
import SimpleBar from 'simplebar-react'
import cn from 'classnames'

import styles from './index.module.less'

export interface ScrollContainerProps extends HTMLAttributes<HTMLDivElement> {
  fullHeight?: boolean
  scrollPadding?: number
  contentPadding?: number | string
  barOffset?: number
  light?: boolean
}

const Index = ({
  className,
  fullHeight,
  scrollPadding = 0,
  contentPadding = 0,
  barOffset = 0,
  light = true,
  ...props
}: ScrollContainerProps) => {
  return (
    <SimpleBar
      className={cn(styles.scrollContainer, { [styles.light]: light }, className)}
      {...props}
      style={{
        ...props.style,
        ...(fullHeight ? { height: '100%', minHeight: 0 } : {}),
        '--simplebar-padding': `${scrollPadding}px`,
        '--simplebar-bar-offset': `${barOffset}px`,
        '--content-padding':
          typeof contentPadding === 'number'
            ? `${contentPadding}px`
            : contentPadding,
      } as React.CSSProperties}
    />
  )
}

export default Index
