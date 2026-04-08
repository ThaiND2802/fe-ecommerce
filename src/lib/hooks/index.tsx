import { useCallback, useEffect, useRef, useState } from 'react'

export const useDebounceFn = <F extends (...args: any[]) => void>(fn: F, delay = 300) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  return useCallback(
    (...args: Parameters<F>) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)

      timeoutRef.current = setTimeout(() => {
        fn(...args)
      }, delay)
    },
    [fn, delay],
  )
}

export const useEffectFromSecond = (effect: () => void, deps: any[]) => {
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    effect()
  }, deps)
}

export const useDelayClosePopup = ({
  delay = 300,
  state,
  updateState,
}: {
  delay?: number
  state: boolean
  updateState: (state?: boolean) => void
}) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [isVisible, setIsVisible] = useState(state)

  const close = () => {
    setIsVisible(false)
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      updateState(false)
    }, delay)
  }

  useEffect(() => {
    clearTimeout(timeoutRef.current)
    setIsVisible(state)
  }, [state])

  return {
    isVisible,
    isRender: state,
    close,
  }
}
