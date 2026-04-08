import { useEffect, useRef, useState } from 'react'
import SimpleBar from 'simplebar-react'
import { useDebounceFn } from '.'

export const useBottomLoadMore = ({
  ref,
  end = false,
  autoInitialLoad = 3000,
  onLoadMore,
}: {
  ref: React.RefObject<SimpleBar>
  end?: boolean
  autoInitialLoad?: number
  onLoadMore: () => void
}) => {
  const loadMore = useDebounceFn(() => {
    onLoadMore()
  }, 300)

  useEffect(() => {
    if (end) return
    const scrollEl = ref.current?.getScrollElement?.()
    if (!scrollEl) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollEl
      const nearBottom = scrollTop + clientHeight >= scrollHeight - 20

      if (nearBottom) {
        loadMore()
      }
    }

    const noScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollEl
      return scrollTop + clientHeight >= scrollHeight
    }

    let recheckTimeout: NodeJS.Timeout | null = null
    const noScrollCheck = () => {
      if (autoInitialLoad && !end && noScroll()) {
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

export const useScrollMonitor = ({ onScroll }: { onScroll?: (scrollTop: number) => void } = {}) => {
  const ref = useRef<SimpleBar>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const scrollEl = ref.current?.getScrollElement?.()
    if (!scrollEl) return

    const handleScroll = () => {
      const { scrollTop } = scrollEl
      setScrolled(scrollTop > 0)
      onScroll?.(scrollTop)
    }

    scrollEl.addEventListener('scroll', handleScroll)
    return () => {
      scrollEl.removeEventListener('scroll', handleScroll)
    }
  }, [ref])

  return {
    ref,
    scrolled,
  }
}
