import { Flex, Tabs, Popover } from 'antd'
import { useMutation } from '@tanstack/react-query'
import { useSignals } from '@preact/signals-react/runtime'

import useLocaleGroup from 'src/locales/useLocaleGroup'
import NotificationStore from 'src/store/notification'
import { markNotificationReadAll } from 'src/entities/notification'
import Icon from '../Icon'
import List from './List'
import { useAllMessages, useUnreadMessages } from './hook'

import styles from './index.module.less'

const Index = () => {
  useSignals()
  const [t] = useLocaleGroup('notifications')
  const { unreadCount } = NotificationStore

  const { data: allMessages, isLoading: isLoadingAll, markReadAll } = useAllMessages()
  const {
    data: unreadMessages,
    isLoading: isLoadingUnread,
    markReadAll: markReadAllUnread,
  } = useUnreadMessages()

  const { mutate: readAll } = useMutation({
    mutationFn: markNotificationReadAll,
    onSuccess: () => {
      unreadCount.value = 0
      markReadAll()
      markReadAllUnread()
    },
  })

  const handleCheckAll = () => {
    readAll()
  }

  return (
    <Flex className={styles.container} vertical gap={10}>
      <Flex className={styles.header}>
        <div className={styles.title}>{t.title}</div>
        {unreadCount.value > 0 && (
          <Popover
            content={<div>{t.markReadAll}</div>}
            trigger="hover"
            placement="bottom"
            arrow={false}>
            <Icon className={styles.checkAll} name="check-all" size={20} onClick={handleCheckAll} />
          </Popover>
        )}
      </Flex>
      <Tabs
        className={styles.tabs}
        items={[
          {
            key: 'all',
            label: t.tab.all,
            children: (
              <List
                key="all"
                loading={isLoadingAll}
                data={allMessages?.map((item) => ({
                  title: item.group_data_name,
                  items: item.notifications,
                }))}
                hasNextPage={false}
              />
            ),
          },
          {
            key: 'unread',
            label: t.tab.unread,
            children: (
              <List
                key="unread"
                loading={isLoadingUnread}
                data={unreadMessages?.map((item) => ({
                  title: item.group_data_name,
                  items: item.notifications,
                }))}
                hasNextPage={false}
              />
            ),
          },
        ]}
      />
    </Flex>
  )
}

export default Index
