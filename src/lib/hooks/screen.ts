import { useCallback, useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import { useDebounceFn } from '.'

export const useScreen = () => {
  const isBigScreen = useMediaQuery({ query: '(min-width: 1600px)' })
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` })

  return { isBigScreen, isMobile }
}

export const useResizeDetector = ({
  debounce = 0,
  breakpoints = [],
}: {
  debounce?: number
  breakpoints?: number[]
}) => {
  const ref = useRef(null)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const breakpointValueRef = useRef(0)

  const updateSize = useCallback(({ width, height }: { width: number; height: number }) => {
    setWidth(width)
    setHeight(height)
    let i = 0
    while (breakpoints[i] && width >= breakpoints[i]) {
      i++
    }
    breakpointValueRef.current = i
  }, [])

  const debounceUpdate = useDebounceFn(updateSize, debounce)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new ResizeObserver(([entry]) => {
      debounceUpdate({ width: entry.contentRect.width, height: entry.contentRect.height })
    })

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, width, height, breakpoint: breakpointValueRef.current }
}
