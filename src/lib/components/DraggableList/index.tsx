import { ReactNode, useEffect } from 'react'
import { Flex, FlexProps } from 'antd'
import { flushSync } from 'react-dom'
import classNames from 'classnames'

import { triggerPostMoveFlash } from '@atlaskit/pragmatic-drag-and-drop-flourish/trigger-post-move-flash'
import { extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'
import { reorderWithEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge'
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'

import Item from './item'
import styles from './index.module.less'

interface DraggableListProps<T> extends Omit<FlexProps, 'onChange' | 'children'> {
  datasource: T[]
  keyField?: keyof T
  className?: string
  itemClassName?: string
  indicatorClassName?: string
  gap?: number
  useNativePreview?: boolean
  scope?: string
  noHandler?: boolean
  indicatorOffset?: number
  itemRender: (item: T, preview?: boolean) => ReactNode
  onChange?: (newList: T[]) => void
  canDrag?: (item: T) => boolean
}

const DraggableList = <T,>({
  className,
  itemClassName,
  indicatorClassName,
  datasource,
  keyField,
  gap = 0,
  useNativePreview = false,
  scope = 'list',
  noHandler = false,
  indicatorOffset = 0,
  itemRender,
  onChange,
  canDrag,
  ...otherProps
}: DraggableListProps<T>) => {
  useEffect(() => {
    return monitorForElements({
      canMonitor({ source }) {
        return !!source.data.id && source.data.scope === scope
      },
      onDrop({ location, source }) {
        const target = location.current.dropTargets[0]
        if (!target) {
          return
        }

        const sourceData = source.data
        const targetData = target.data

        if (!sourceData.id || !targetData.id) {
          return
        }

        const indexOfSource = datasource.findIndex((item) => item[keyField] === sourceData.id)
        const indexOfTarget = datasource.findIndex((item) => item[keyField] === targetData.id)

        if (indexOfTarget < 0 || indexOfSource < 0) {
          return
        }

        const closestEdgeOfTarget = extractClosestEdge(targetData)

        flushSync(() => {
          onChange?.(
            reorderWithEdge({
              list: datasource,
              startIndex: indexOfSource,
              indexOfTarget,
              closestEdgeOfTarget,
              axis: 'vertical',
            }),
          )
        })
        const element = document.querySelector(`[data-id="${sourceData.id as string}"]`)
        if (element instanceof HTMLElement) {
          triggerPostMoveFlash(element)
        }
      },
    })
  }, [datasource])

  return (
    <Flex
      className={classNames(styles.container, className)}
      {...otherProps}
      style={
        { '--indicator-offset': `${indicatorOffset}px`, ...otherProps.style } as React.CSSProperties
      }>
      {datasource?.map((item) => (
        <Item
          className={itemClassName}
          indicatorClassName={indicatorClassName}
          key={item[keyField] as React.Key}
          itemId={item[keyField]}
          gap={gap}
          scope={scope}
          noHandler={noHandler}
          preview={useNativePreview ? undefined : itemRender(item, true)}
          canDrag={canDrag}>
          {itemRender(item)}
        </Item>
      ))}
    </Flex>
  )
}

export default DraggableList
