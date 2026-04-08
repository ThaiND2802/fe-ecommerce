import { useCallback, useEffect, useRef } from 'react'
import { create } from 'zustand'

import { useDebounceFn } from '.'

type ResizeState = {
  width: number
  height: number
  breakpoint: number
  setSize: (width: number, height: number, breakpoints: number[]) => void
}

const createResizeStore = () =>
  create<ResizeState>((set) => ({
    width: 0,
    height: 0,
    breakpoint: 0,
    setSize: (width, height, breakpoints) => {
      let i = 0
      while (breakpoints[i] && width >= breakpoints[i]) {
        i++
      }
      set({ width, height, breakpoint: i })
    },
  }))

export const useResizeDetect = ({
  debounce = 0,
  breakpoints = [],
  enable = true,
}: {
  debounce?: number
  breakpoints?: number[]
  enable?: boolean
} = {}) => {
  const ref = useRef<HTMLDivElement | null>(null)

  const storeRef = useRef<ReturnType<typeof createResizeStore>>(null)
  if (!storeRef.current) {
    storeRef.current = createResizeStore()
  }
  const store = storeRef.current

  const updateSize = useCallback(
    ({ width, height }: { width: number; height: number }) => {
      store.getState().setSize(width, height, breakpoints)
    },
    [breakpoints, store],
  )

  const debounceUpdate = useDebounceFn(updateSize, debounce)

  useEffect(() => {
    if (!enable) return
    const el = ref.current
    if (!el) return

    const observer = new ResizeObserver(([entry]) => {
      debounceUpdate({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      })
    })

    observer.observe(el)
    return () => observer.disconnect()
  }, [debounceUpdate, enable])

  return {
    ref,
    useWidth: () => store((s) => s.width),
    useHeight: () => store((s) => s.height),
    useBreakpoint: () => store((s) => s.breakpoint),
  }
}
