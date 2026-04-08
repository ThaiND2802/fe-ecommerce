import React, { useEffect } from 'react'
import { Flex, FlexProps } from 'antd'
import cn from 'classnames'

import { useResizeDetect } from 'src/lib/hooks/resize-detect'

import styles from './index.module.less'

interface Props<T> extends FlexProps {
  itemWidth?: number
  gap?: number
  excludeWidth?: number
  data: T[]
  debounce?: number
  minSlots?: number
  showAll?: boolean
  showChildren?: boolean
  itemRender: (item: T, isFull: boolean) => React.ReactNode
  onSlotChange?: (hidden: number) => void
}

const Index = <T,>({
  className,
  children,
  data = [],
  itemWidth,
  excludeWidth = 0,
  gap = 0,
  debounce = 100,
  minSlots = 0,
  showAll = false,
  showChildren,
  itemRender,
  onSlotChange,
  ...props
}: Props<T>) => {
  const { ref, useWidth } = useResizeDetect({ debounce })
  const itemCount = data?.length || 0

  const width = useWidth()
  const gapByItem = itemCount < 2 ? 0 : (gap * (itemCount - 1)) / itemCount
  const slotsNoExtra = Math.floor(width / (itemWidth + gapByItem))

  const slots =
    slotsNoExtra >= data.length
      ? slotsNoExtra
      : Math.floor((width - excludeWidth) / (itemWidth + gap))
  const itemsToRender = showAll ? data : data.slice(0, Math.max(slots, minSlots))

  useEffect(() => {
    onSlotChange?.(data.length - Math.max(slots, minSlots))
  }, [slots])

  return (
    <Flex ref={ref} className={cn(styles.container, className)} gap={gap} {...props}>
      {itemsToRender.length > 0 ? (
        itemsToRender.map((item) => itemRender(item, itemsToRender.length === data.length))
      ) : (
        <span />
      )}
      {itemsToRender.length < data.length || (showAll && showChildren) ? children : null}
    </Flex>
  )
}

export default Index
