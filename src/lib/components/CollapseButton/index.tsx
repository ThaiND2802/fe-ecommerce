import { Button, ButtonProps, Tooltip } from 'antd'
import cn from 'classnames'

import styles from './index.module.less'
import { useState } from 'react'

interface IProps extends ButtonProps {
  collapsed: boolean
}

const Index = ({ collapsed, className, title, ...props }: IProps) => {
  const [open, setOpen] = useState(false)

  const handleOpenChange = (open: boolean) => {
    setOpen(props.disabled || !collapsed ? false : open)
  }

  return (
    <Tooltip title={title} placement="right" open={open} onOpenChange={handleOpenChange}>
      <Button
        className={cn(styles.button, { [styles.collapsed]: collapsed, collapsed }, className)}
        size="large"
        {...props}
      />
    </Tooltip>
  )
}

export default Index
