import { useCallback, useRef, useState, useEffect } from 'react'

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

export function useEffectEvent<T extends (...args: any[]) => any>(fn: T): T {
  const ref = useRef(fn)
  ref.current = fn

  return useCallback(((...args) => ref.current(...args)) as T, [])
}

export const useBlockByUpdatedData = (data: any, timeout = 500) => {
  const [block, setBlock] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (data) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        setBlock(false)
      }, timeout)
      setBlock(true)
    }
  }, [data])

  return block
}
