import { HTMLAttributes, useEffect } from 'react'
import classNames from 'classnames'

import styles from './index.module.less'
import useResize from './hook'

interface IProps extends HTMLAttributes<HTMLDivElement> {
  offset?: number
  initialWidth?: number
  minWidth?: number
  maxWidth?: number
  leftExpand?: boolean
  disableResize?: boolean
  onWidthChange?: (width: number) => void
}

const Index = ({
  className,
  children,
  offset = 0,
  initialWidth = 250,
  minWidth = 200,
  maxWidth = 500,
  leftExpand = false,
  disableResize = false,
  onWidthChange,
  ...props
}: IProps) => {
  const { width, ResizeHanlder } = useResize({
    initialWidth,
    minWidth,
    maxWidth,
    offset,
    leftExpand,
    disableResize,
  })

  useEffect(() => {
    onWidthChange?.(width)
  }, [width])

  return (
    <>
      <div
        className={classNames(styles.container, className)}
        {...props}
        style={{ ...props.style, width }}>
        {children}
      </div>
      {!disableResize && ResizeHanlder}
    </>
  )
}

export default Index
