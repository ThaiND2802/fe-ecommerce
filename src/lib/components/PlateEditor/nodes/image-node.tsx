import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  useEditorRef,
  usePath,
  useSelected,
  useFocused,
  PlateElement,
  type PlateElementProps,
} from 'platejs/react'

interface ResizeHandleProps {
  position: 'top' | 'left' | 'bottom' | 'right'
  onMouseDown?: (e: React.MouseEvent) => void
}

// Handle styling constants
const HANDLE_COLOR = '#DBDCE2'
const HANDLE_OPACITY = 0.8
const HANDLE_Z_INDEX = 10
const HANDLE_WIDTH = 2 // pixels - width/height for edge handles (top, left, bottom, right)
const HANDLE_BORDER_RADIUS = '2px' // border radius for edge handles
const CORNER_HANDLE_SIZE = 8 // pixels - size for corner resize handle (width x height)
const CORNER_HANDLE_BORDER_RADIUS = '1px' // border radius for corner handle

// Image resize constraints
const MIN_IMAGE_SIZE = 50 // pixels - minimum width/height for image
const WINDOW_SIZE_BUFFER = 100 // pixels - buffer from window edges for max size

// Image styling constants
const IMAGE_BORDER_RADIUS = '4px'
const IMAGE_WRAPPER_MARGIN = '8px 0'
const IMAGE_MAX_WIDTH = '100%'

// Resize Handle Component
function ResizeHandle({ position, onMouseDown }: Readonly<ResizeHandleProps>) {
  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    backgroundColor: HANDLE_COLOR,
    borderRadius: HANDLE_BORDER_RADIUS,
    opacity: HANDLE_OPACITY,
    zIndex: HANDLE_Z_INDEX,
    border: 'none',
    padding: 0,
    margin: 0,
    outline: 'none',
    pointerEvents: 'all',
  }

  const positionStyles: Record<ResizeHandleProps['position'], React.CSSProperties> = {
    top: {
      ...baseStyle,
      top: 0,
      left: 0,
      right: 0,
      height: HANDLE_WIDTH,
      cursor: onMouseDown ? 'ns-resize' : 'default',
    },
    left: {
      ...baseStyle,
      left: 0,
      top: 0,
      bottom: 0,
      width: HANDLE_WIDTH,
      cursor: onMouseDown ? 'ew-resize' : 'default',
    },
    bottom: {
      ...baseStyle,
      bottom: 0,
      left: 0,
      right: 0,
      height: HANDLE_WIDTH,
      cursor: onMouseDown ? 'ns-resize' : 'default',
    },
    right: {
      ...baseStyle,
      right: 0,
      top: 0,
      bottom: 0,
      width: HANDLE_WIDTH,
      cursor: onMouseDown ? 'ew-resize' : 'default',
    },
  }

  return (
    <button
      type="button"
      onMouseDown={onMouseDown}
      aria-label={`Resize image ${position}`}
      style={positionStyles[position]}
    />
  )
}

function CornerResizeHandle({
  onMouseDown,
}: Readonly<{ onMouseDown: (e: React.MouseEvent) => void }>) {
  return (
    <button
      type="button"
      onMouseDown={onMouseDown}
      aria-label="Resize image corner"
      style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: `${CORNER_HANDLE_SIZE}px`,
        height: `${CORNER_HANDLE_SIZE}px`,
        cursor: 'nwse-resize',
        backgroundColor: HANDLE_COLOR,
        borderRadius: CORNER_HANDLE_BORDER_RADIUS,
        opacity: HANDLE_OPACITY,
        zIndex: HANDLE_Z_INDEX,
        border: 'none',
        padding: 0,
        margin: 0,
        outline: 'none',
        pointerEvents: 'all',
      }}
    />
  )
}

// Image Element Component with resize functionality
export function ImageElement(props: PlateElementProps) {
  const { element, children } = props
  const editor = useEditorRef()
  const path = usePath()
  const selected = useSelected()
  const focused = useFocused()
  const url = (element?.url as string) || ''
  const elementWidth = element?.width as number | string | undefined
  const elementHeight = element?.height as number | string | undefined
  const [width, setWidth] = useState<number | string>(elementWidth || 'auto')
  const [height, setHeight] = useState<number | string>(elementHeight || 'auto')
  const [isResizing, setIsResizing] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)

  // Update width and height from element if it changes externally
  useEffect(() => {
    if (elementWidth && elementWidth !== width) {
      setWidth(elementWidth)
    }
    if (elementHeight && elementHeight !== height) {
      setHeight(elementHeight)
    }
  }, [elementWidth, elementHeight, width, height])

  // Handle resize for right handle (width only)
  const handleRightMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsResizing(true)

      const startX = e.clientX
      const startWidth = imageRef.current?.offsetWidth || 0
      const minWidth = MIN_IMAGE_SIZE
      const maxWidth = window.innerWidth - WINDOW_SIZE_BUFFER
      const imageHeight = imageRef.current?.offsetHeight || 0

      const handleMouseMoveRight = (e: MouseEvent) => {
        const diff = e.clientX - startX
        const newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth + diff))
        setWidth(newWidth)

        // Update element width in editor
        if (path) {
          editor.tf.setNodes(
            {
              width: newWidth,
              height: imageHeight,
            },
            {
              at: path,
            },
          )
        }
      }

      const handleMouseUp = () => {
        setIsResizing(false)
        document.removeEventListener('mousemove', handleMouseMoveRight)
        document.removeEventListener('mouseup', handleMouseUp)
      }

      document.addEventListener('mousemove', handleMouseMoveRight)
      document.addEventListener('mouseup', handleMouseUp)
    },
    [editor, path],
  )

  // Handle resize for bottom handle (height only)
  const handleBottomMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsResizing(true)

      const startY = e.clientY
      const startHeight = imageRef.current?.offsetHeight || 0
      const startWidth = imageRef.current?.offsetWidth || 0
      const minHeight = MIN_IMAGE_SIZE
      const maxHeight = window.innerHeight - WINDOW_SIZE_BUFFER
      const imageWidth = imageRef.current?.offsetWidth || 0

      const handleMouseMoveBottom = (e: MouseEvent) => {
        const diff = e.clientY - startY
        const newHeight = Math.max(minHeight, Math.min(maxHeight, startHeight + diff))

        // Calculate aspect ratio to maintain width proportionally
        if (imageRef.current && startHeight > 0 && startWidth > 0) {
          // Update element width in editor (we maintain aspect ratio via width)
          if (path) {
            editor.tf.setNodes(
              {
                width: imageWidth,
                height: newHeight,
              },
              {
                at: path,
              },
            )
          }
        }
      }

      const handleMouseUp = () => {
        setIsResizing(false)
        document.removeEventListener('mousemove', handleMouseMoveBottom)
        document.removeEventListener('mouseup', handleMouseUp)
      }

      document.addEventListener('mousemove', handleMouseMoveBottom)
      document.addEventListener('mouseup', handleMouseUp)
    },
    [editor, path],
  )

  // Handle resize for corner handle (both width and height maintaining aspect ratio)
  const handleCornerMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsResizing(true)

      const startX = e.clientX
      const startY = e.clientY
      const startWidth = imageRef.current?.offsetWidth || 0
      const startHeight = imageRef.current?.offsetHeight || 0
      const aspectRatio = startHeight > 0 ? startWidth / startHeight : 1
      const minWidth = MIN_IMAGE_SIZE
      const minHeight = MIN_IMAGE_SIZE
      const maxWidth = window.innerWidth - WINDOW_SIZE_BUFFER
      const maxHeight = window.innerHeight - WINDOW_SIZE_BUFFER

      const handleMouseMove = (e: MouseEvent) => {
        const diffX = e.clientX - startX
        const diffY = e.clientY - startY

        // Use dominant axis approach: determine which direction has more movement
        // and scale both dimensions proportionally based on aspect ratio
        const absDiffX = Math.abs(diffX)
        const absDiffY = Math.abs(diffY)

        let newWidth: number
        let newHeight: number

        if (absDiffX > absDiffY) {
          // Horizontal movement is dominant - scale based on width change
          newWidth = startWidth + diffX
          newHeight = newWidth / aspectRatio
        } else {
          // Vertical movement is dominant - scale based on height change
          newHeight = startHeight + diffY
          newWidth = newHeight * aspectRatio
        }

        // Apply constraints while maintaining aspect ratio
        // Check if dimensions exceed limits and adjust accordingly
        // We need to find the largest size that fits within all constraints

        // Calculate both possible sizes based on width and height constraints
        const widthConstrainedWidth = Math.max(minWidth, Math.min(maxWidth, newWidth))
        const widthConstrainedHeight = widthConstrainedWidth / aspectRatio

        const heightConstrainedHeight = Math.max(minHeight, Math.min(maxHeight, newHeight))
        const heightConstrainedWidth = heightConstrainedHeight * aspectRatio

        // Choose the constraint that gives the smaller size (fits within both limits)
        if (
          widthConstrainedHeight <= maxHeight &&
          widthConstrainedHeight >= minHeight &&
          widthConstrainedWidth >= minWidth &&
          widthConstrainedWidth <= maxWidth
        ) {
          // Width-based constraint fits, use it
          newWidth = widthConstrainedWidth
          newHeight = widthConstrainedHeight
        } else {
          // Use height-based constraint (it should fit since we check it first)
          newWidth = Math.max(minWidth, Math.min(maxWidth, heightConstrainedWidth))
          newHeight = newWidth / aspectRatio
        }

        setWidth(newWidth)
        setHeight(newHeight)

        // Update element width and height in editor
        if (path) {
          editor.tf.setNodes(
            {
              width: newWidth,
              height: newHeight,
            },
            {
              at: path,
            },
          )
        }
      }

      const handleMouseUp = () => {
        setIsResizing(false)
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    },
    [editor, path],
  )

  const imageStyle: React.CSSProperties = {
    maxWidth: IMAGE_MAX_WIDTH,
    display: 'block',
    borderRadius: IMAGE_BORDER_RADIUS,
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    cursor: isResizing ? 'ew-resize' : 'default',
  }

  const wrapperStyle: React.CSSProperties = {
    display: 'inline-block',
    margin: IMAGE_WRAPPER_MARGIN,
    position: 'relative',
    maxWidth: IMAGE_MAX_WIDTH,
  }

  return (
    <PlateElement {...props} style={wrapperStyle} as="div">
      <div
        style={{ position: 'relative', display: 'inline-block' }}
        contentEditable={false}
        suppressContentEditableWarning>
        <img ref={imageRef} src={url} alt="" style={imageStyle} />
        {selected && focused && (
          <>
            <ResizeHandle position="top" />
            <ResizeHandle position="left" />
            <ResizeHandle position="bottom" onMouseDown={handleBottomMouseDown} />
            <ResizeHandle position="right" onMouseDown={handleRightMouseDown} />
            <CornerResizeHandle onMouseDown={handleCornerMouseDown} />
          </>
        )}
      </div>
      {children}
    </PlateElement>
  )
}
