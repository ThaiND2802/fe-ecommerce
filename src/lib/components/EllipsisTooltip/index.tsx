import React from 'react'
import { Popover } from 'antd'
import classNames from 'classnames'

import styles from './index.module.less'
import { TooltipPlacement } from 'antd/lib/tooltip'

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  full?: boolean
  line?: number
  tooltipContent?: string
  tooltipContentClassName?: string
  tooltipPlacement?: TooltipPlacement
  children: string
}

const Index = ({
  children,
  className,
  full,
  line = 1,
  style,
  tooltipContent,
  tooltipContentClassName,
  tooltipPlacement,
  ...props
}: IProps) => (
  <Popover
    title={
      <div className={classNames(styles.tooltipContent, tooltipContentClassName)}>
        {tooltipContent || children}
      </div>
    }
    placement={tooltipPlacement || 'top'}>
    <div
      className={classNames(className, full ? styles.full : styles.ellipsis)}
      style={{ lineClamp: line, WebkitLineClamp: line, ...style }}
      {...props}>
      {children}
    </div>
  </Popover>
)

export default Index
