import { useEffect, useMemo, useRef, useState, useEffectEvent } from 'react'

import styles from './hook.module.less'

const useResize = ({
  initialWidth,
  minWidth = 200,
  maxWidth = 500,
  offset = 0,
  leftExpand = false,
  disableResize = false,
}: {
  initialWidth: number
  minWidth?: number
  maxWidth?: number
  offset?: number
  leftExpand?: boolean
  disableResize?: boolean
}) => {
  const [width, setWidth] = useState(initialWidth)
  const resizeRef = useRef<HTMLDivElement>(null)

  const ResizeHanlder = useMemo(() => {
    if (leftExpand) {
      return (
        <div ref={resizeRef} className={styles.resizerLeft} style={{ right: width + offset }} />
      )
    }

    return <div ref={resizeRef} className={styles.resizerRight} style={{ left: width + offset }} />
  }, [width, offset, leftExpand])

  const getCurrentWidth = useEffectEvent(() => {
    return width
  })

  const direction = leftExpand ? -1 : 1

  useEffect(() => {
    if (disableResize) return

    let currentX = 0
    let previousX = 0
    let mouseDownX = 0

    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault()
      currentX = getCurrentWidth()
      previousX = currentX
      mouseDownX = e.clientX
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    }

    const onMouseMove = (e: MouseEvent) => {
      const deltaX = Math.min(e.clientX, window.innerWidth - 200) - mouseDownX
      currentX = Math.max(minWidth, Math.min(maxWidth, previousX + deltaX * direction))
      setWidth(currentX)
    }

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    resizeRef.current?.addEventListener('mousedown', onMouseDown)

    return () => {
      resizeRef.current?.removeEventListener('mousedown', onMouseDown)
    }
  }, [disableResize])

  return {
    width,
    ResizeHanlder,
  }
}

export default useResize
