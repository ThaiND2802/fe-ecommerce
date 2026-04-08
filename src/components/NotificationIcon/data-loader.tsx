import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSignals } from '@preact/signals-react/runtime'

import NotificationStore from 'src/store/notification'
import ModulesStore, { ModulesListStore } from 'src/store/modules'

import { modulesQueries } from 'src/entities/modules/queries'
import { notificationQueries } from 'src/entities/notification/queries'
import { queryClient } from 'src/query'

const Index = () => {
  useSignals()
  const { notifications } = NotificationStore

  const { data: modules } = useQuery(modulesQueries.list())
  const { data: unreadCount } = useQuery(notificationQueries.unreadCount())

  useEffect(() => {
    if (modules) {
      ModulesListStore.value = modules
      ModulesStore.value = modules.reduce((acc, module) => {
        acc[module.module_id] = module
        return acc
      }, {})
    }
  }, [modules])

  useEffect(() => {
    if (notifications.value.length > 0) {
      NotificationStore.unreadCount.value = NotificationStore.unreadCount.value + 1
      queryClient.invalidateQueries(notificationQueries.listInfinity())
      queryClient.invalidateQueries(notificationQueries.listInfinity(true))
    }
  }, [notifications.value])

  useEffect(() => {
    if (unreadCount) {
      NotificationStore.unreadCount.value = unreadCount.find((item) => !item.is_read)?.count || 0
    }
  }, [unreadCount])

  return null
}

export default Index
