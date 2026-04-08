import React, { useEffect, useRef, useState } from 'react'
import { Flex } from 'antd'
import { createPortal } from 'react-dom'
import classNames from 'classnames'

import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { pointerOutsideOfPreview } from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview'
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview'
import {
  attachClosestEdge,
  type Edge,
  extractClosestEdge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'

import DropIndicator from './drop-indicator'
import styles from './index.module.less'

enum DragState {
  idle = 'idle',
  preview = 'preview',
  dragging = 'dragging',
  draggingOver = 'draggingOver',
}

type DragStateWithData =
  | {
      type: DragState.idle
    }
  | {
      type: DragState.preview
      container: HTMLElement
    }
  | {
      type: DragState.dragging
    }
  | {
      type: DragState.draggingOver
      closestEdge: Edge | null
    }

const idle: DragStateWithData = { type: DragState.idle }

interface DraggableItemProps {
  children: React.ReactNode
  itemId: any
  className?: string
  indicatorClassName?: string
  gap?: number
  preview?: React.ReactNode
  scope: string
  noHandler?: boolean
  canDrag?: (item: any) => boolean
}

const Item = ({
  itemId,
  children,
  className,
  indicatorClassName,
  gap,
  preview,
  scope,
  noHandler,
  canDrag = () => true,
}: DraggableItemProps) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [state, setState] = useState<DragStateWithData>(idle)

  useEffect(() => {
    const element = ref.current

    return combine(
      draggable({
        element,
        dragHandle: noHandler ? undefined : element.querySelector(`.${styles.handler}`),
        canDrag() {
          return !!itemId && canDrag?.(itemId)
        },
        getInitialData() {
          return { id: itemId, scope }
        },
        onGenerateDragPreview({ nativeSetDragImage }) {
          if (!preview) {
            return
          }
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: pointerOutsideOfPreview({
              x: '10px',
              y: '10px',
            }),
            render({ container }) {
              setState({ type: DragState.preview, container })
            },
          })
        },
        onDragStart() {
          setState({ type: DragState.dragging })
        },
        onDrop() {
          setState(idle)
        },
      }),
      dropTargetForElements({
        element,
        canDrop({ source }) {
          // not allowing dropping on yourself
          if (source.element === element) {
            return false
          }
          return !!source.data.id && source.data.scope === element.dataset.dragScope
        },
        getData({ input }) {
          const data = { id: itemId }
          return attachClosestEdge(data, {
            element,
            input,
            allowedEdges: ['top', 'bottom'],
          })
        },
        getIsSticky() {
          return true
        },
        onDragEnter({ self }) {
          const closestEdge = extractClosestEdge(self.data)
          setState({ type: DragState.draggingOver, closestEdge })
        },
        onDrag({ self }) {
          const closestEdge = extractClosestEdge(self.data)

          // checking before setState
          setState((current) => {
            if (current.type === DragState.draggingOver && current.closestEdge === closestEdge) {
              return current
            }
            return { type: DragState.draggingOver, closestEdge }
          })
        },
        onDragLeave() {
          setState(idle)
        },
        onDrop() {
          setState(idle)
        },
      }),
    )
  }, [itemId, preview])

  return (
    <>
      <Flex className={classNames(styles.itemWrapper, className)}>
        <div
          className={classNames(styles.item, state.type, 'draggable-inner')}
          data-id={itemId}
          data-drag-scope={scope}
          ref={ref}>
          {children}
        </div>
        {state.type === DragState.draggingOver && state.closestEdge ? (
          <DropIndicator className={indicatorClassName} edge={state.closestEdge} gap={gap} />
        ) : null}
      </Flex>
      {state.type === DragState.preview
        ? createPortal(<DragPreview>{preview || children}</DragPreview>, state.container)
        : null}
    </>
  )
}

const DragPreview = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.dragPreview}>{children}</div>
}

export default Item
