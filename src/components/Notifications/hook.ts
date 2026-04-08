import { useEffect, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'

import { notificationQueries } from 'src/entities/notification/queries'
import { useEffectEvent } from 'src/hook'
import { queryClient } from 'src/query'
import event from 'src/store/event'
import { NotificationMessage, NotificationMessageGroup } from 'src/entities/notification'

export const useAllMessages = () => {
  const [mergedData, setMergedData] = useState([])

  const {
    data: allMessages,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(notificationQueries.listInfinity())

  const mergeData = useEffectEvent(() => {
    const lastData = mergedData
    const newData = allMessages?.pages?.[allMessages?.pages?.length - 1]?.data

    if (newData?.length) {
      const lastGroup = lastData?.[lastData?.length - 1]
      const firstGroup = newData?.[0]

      if (lastGroup?.group_data_id === firstGroup?.group_data_id) {
        lastGroup.notifications = [
          ...(lastGroup?.notifications || []),
          ...(firstGroup?.notifications || []),
        ]
        setMergedData([...lastData])
      } else {
        setMergedData([...mergedData, ...newData])
      }
    }
  })

  const handleLoadMore = useEffectEvent(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  })

  const markReadAll = useEffectEvent(() => {
    mergedData.forEach((item) => {
      item.notifications.forEach((noti) => {
        noti.is_read = true
      })
    })
  })

  const markRead = useEffectEvent((id: string) => {
    for (const item of mergedData) {
      for (const noti of item.notifications) {
        if (noti.id === id) {
          noti.is_read = true
          break
        }
      }
    }
  })

  useEffect(() => {
    mergeData()
  }, [allMessages])

  useEffect(() => {
    const handleMarkRead = (notiId: string) => {
      markRead(notiId)
    }
    event.on('notification:read', handleMarkRead)
    return () => {
      event.off('notification:read', handleMarkRead)
    }
  }, [])

  return {
    isLoading,
    data: mergedData,
    hasNextPage,
    loadMore: handleLoadMore,
    markReadAll,
  }
}

export const useUnreadMessages = () => {
  const [mergedData, setMergedData] = useState<NotificationMessageGroup[]>([])

  const {
    data: allMessages,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    fetchNextPage,
  } = useInfiniteQuery(notificationQueries.listInfinity(true))

  const mergeData = useEffectEvent(() => {
    const lastData = mergedData
    const newData = allMessages?.pages?.[allMessages?.pages?.length - 1]?.data

    if (newData?.length) {
      const lastGroup = lastData?.[lastData?.length - 1]
      const firstGroup = newData?.[0]

      if (lastGroup?.group_data_id === firstGroup?.group_data_id) {
        lastGroup.notifications = [
          ...(lastGroup?.notifications || []),
          ...(firstGroup?.notifications || []),
        ]
        setMergedData([...lastData])
      } else {
        setMergedData([...mergedData, ...newData])
      }
    }
  })

  const handleLoadMore = useEffectEvent(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  })

  const markReadAll = useEffectEvent(() => {
    setMergedData([])
    queryClient.invalidateQueries({
      queryKey: notificationQueries.listInfinity(true).queryKey,
    })
  })

  const filterNotification = (notifications: NotificationMessage[], id: string) => {
    return notifications.filter((noti) => noti.id !== id)
  }

  const markRead = useEffectEvent((id: string) => {
    setMergedData((prevData) => {
      const newData = prevData
        .map((group) => ({
          ...group,
          notifications: filterNotification(group.notifications, id),
        }))
        .filter((group) => group.notifications.length > 0)
      return newData
    })
  })

  useEffect(() => {
    mergeData()
  }, [allMessages])

  useEffect(() => {
    const handleMarkRead = (notiId: string) => {
      markRead(notiId)
    }
    event.on('notification:read', handleMarkRead)
    return () => {
      event.off('notification:read', handleMarkRead)
    }
  }, [])

  return {
    isLoading,
    data: mergedData,
    hasNextPage,
    loadMore: handleLoadMore,
    markReadAll,
  }
}
