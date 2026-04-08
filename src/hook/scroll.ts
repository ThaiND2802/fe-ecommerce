import { useEffect, useRef } from 'react'
import { useDebounceFn, useEffectEvent } from './index'

export const useBottomLoadMore = ({
  ref,
  end = false,
  autoInitialLoad = 3000,
  loadMoreDebounce = 300,
  scrollHandlerDelay = 300,
  bottomOffset = 20,
  onLoadMore,
}: {
  ref: React.RefObject<any>
  end?: boolean
  autoInitialLoad?: number
  loadMoreDebounce?: number
  scrollHandlerDelay?: number
  bottomOffset?: number
  onLoadMore: () => void
}) => {
  const scrollHandlerTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const loadMore = useDebounceFn(() => {
    !end && onLoadMore()
  }, loadMoreDebounce)

  const delayedScrollHandler = useDebounceFn(() => {
    const scrollEl = ref.current?.getScrollElement?.()
    if (!scrollEl) return
    const { scrollTop, scrollHeight, clientHeight } = scrollEl
    const nearBottom = scrollTop + clientHeight >= scrollHeight - bottomOffset

    if (nearBottom) {
      loadMore()
    }
  }, loadMoreDebounce)

  const handleScroll = useEffectEvent(() => {
    clearTimeout(scrollHandlerTimeoutRef.current)
    scrollHandlerTimeoutRef.current = setTimeout(() => {
      delayedScrollHandler()
    }, scrollHandlerDelay)
  })

  useEffect(() => {
    if (end) return
    const scrollEl = ref.current?.getScrollElement?.()
    if (!scrollEl) return

    const noScroll = () => {
      const { scrollHeight, clientHeight } = scrollEl
      return clientHeight >= scrollHeight
    }

    let recheckTimeout: NodeJS.Timeout | null = null
    const noScrollCheck = () => {
      if (autoInitialLoad && !end && noScroll() && scrollEl.isVisible) {
        loadMore()
        recheckTimeout = setTimeout(() => {
          noScrollCheck()
        }, autoInitialLoad)
      }
    }

    noScrollCheck()

    scrollEl.addEventListener('scroll', handleScroll)
    return () => {
      clearTimeout(recheckTimeout)
      scrollEl.removeEventListener('scroll', handleScroll)
    }
  }, [ref, onLoadMore, end])
}
