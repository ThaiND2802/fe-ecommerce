import { useMemo } from 'react'
import { Space, Drawer as AntdDrawer, DrawerProps as AntdDrawerProps, Button, Flex } from 'antd'
import classNames from 'classnames'
import SimpleBar from 'simplebar-react'

import IconSax from '../IconSax'
import ScrollContainer from '../ScrollContainer'
import Divider from '../Divider'

import styles from './index.module.less'
import { ActionIcon } from '../ActionIcon'

export interface DrawerProps extends AntdDrawerProps {
  simpleBarRef?: React.RefObject<typeof SimpleBar>
  actionDivider?: boolean
  back?: boolean
  iconSize?: number
  noPadding?: boolean
  onBack?: () => void
}

const Drawer = ({
  children,
  className,
  actionDivider = false,
  back,
  title,
  iconSize = 30,
  noPadding = false,
  onBack,
  ...otherProps
}: DrawerProps) => {
  const extra = useMemo(() => {
    const CloseButton = (
      <Flex className={styles.closeButtonOuter}>
        <Button
          className={styles.closeButton}
          type="text"
          onClick={(e) => {
            otherProps?.onClose?.(e)
          }}>
          <IconSax name="x" size={22} />
        </Button>
      </Flex>
    )
    if (otherProps.extra) {
      return (
        <Flex justify="end" gap={0}>
          <Space className={styles.actions}>{otherProps.extra}</Space>
          {actionDivider && <Divider type="vertical" style={{ height: 32 }} margin={[12, 4]} />}
          {CloseButton}
        </Flex>
      )
    }
    return CloseButton
  }, [otherProps.extra])

  const customTitle = useMemo(() => {
    if (back) {
      return (
        <>
          <ActionIcon className={styles.backIcon} onClick={onBack}>
            <IconSax name="arrow-left" size={iconSize} />
          </ActionIcon>
          <span>{title}</span>
        </>
      )
    }
    return title
  }, [title, back, onBack])

  return (
    <AntdDrawer
      title={customTitle}
      {...otherProps}
      className={classNames(className, styles.drawer, {
        [styles.noPadding]: noPadding,
      })}
      closable={false}
      extra={extra}>
      <div className={classNames(styles.body)}>{children}</div>
    </AntdDrawer>
  )
}

const DrawerWithScroll = ({
  children,
  simpleBarRef,
  scrollPadding = 0,
  contentPadding,
  ...otherProps
}: DrawerProps & { scrollPadding?: number; contentPadding?: number | string }) => {
  const defaultContentPadding =
    otherProps.noPadding && contentPadding === undefined ? '12px 0' : contentPadding

  return (
    <Drawer {...otherProps}>
      <ScrollContainer
        className={styles.scrollContainer}
        style={
          {
            height: '100%',
            '--content-padding':
              typeof defaultContentPadding === 'number'
                ? `${defaultContentPadding}px`
                : defaultContentPadding,
          } as React.CSSProperties
        }
        scrollPadding={scrollPadding}>
        {children}
      </ScrollContainer>
    </Drawer>
  )
}

export default Drawer
export { DrawerWithScroll }
