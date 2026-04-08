import { useMemo, useState } from 'react'
import { Popover, PopoverProps as AntdPopoverProps, Flex } from 'antd'
import cn from 'classnames'

import IconSax from '../IconSax'
import { ActionIcon } from '../ActionIcon'
import Divider from '../Divider'

import styles from './index.module.less'

export interface PopoverProps extends AntdPopoverProps {
  title?: React.ReactNode
  actions?: React.ReactNode[]
  closeable?: boolean
}

const Index = ({ classNames, title, actions, closeable, ...props }: PopoverProps) => {
  const [open, setOpen] = useState(false)

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const customTitle = useMemo(() => {
    return (
      <>
        <div className={styles.title}>{title}</div>
        {!!actions?.length && (
          <Flex className={styles.actions} gap={8}>
            {actions.map((action) => action)}
          </Flex>
        )}
        {closeable && (
          <>
            {!!actions?.length && (
              <Divider type="vertical" style={{ height: 32 }} margin={[12, 4]} />
            )}
            <ActionIcon onClick={handleClose}>
              <IconSax name="x" size={22} />
            </ActionIcon>
          </>
        )}
      </>
    )
  }, [title, actions])

  return (
    <Popover
      classNames={{
        ...classNames,
        body: cn(styles.popoverBody, classNames?.body),
      }}
      open={open}
      onOpenChange={handleOpenChange}
      {...props}
      title={customTitle}
    />
  )
}

export default Index
