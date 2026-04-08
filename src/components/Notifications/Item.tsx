import { Flex } from 'antd'
import { useMutation } from '@tanstack/react-query'
import dayjs from 'dayjs'

import useLocaleGroup from 'src/locales/useLocaleGroup'
import { formatDateWithTime } from 'src/utils/date'
import { NotificationItem } from './type'
import Ellipsis from '../Ellipsis'
import ModulesStore from 'src/store/modules'
import NotificationStore from 'src/store/notification'
import { PATH_TREE } from 'src/router/routes'
import { markNotificationRead } from 'src/entities/notification'
import event from 'src/store/event'

import styles from './Item.module.less'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
const navigateToModule = (noti: NotificationItem) => {
  const moduleInfo = ModulesStore.value?.[noti.module_id]

  const domain = moduleInfo?.path_url?.replace(/\/$/, '')?.replace('{tenant}', noti.tenant_id)
  const path = (PATH_TREE[noti.module_id]?.defaultPath || '')
    .replace('{tenantId}', noti.tenant_id)
    .replace('{entityId}', noti.entity_id)

  if (domain) {
    window.location.href = `${domain}${path}`
  }
}

const batchMarkRead = (notiId: string) => {
  NotificationStore.unreadCount.value = Math.max(NotificationStore.unreadCount.value - 1, 0)
  event.emit('notification:read', notiId)
}

const Item = ({ data }: { data: NotificationItem }) => {
  const [t] = useLocaleGroup('notifications')
  const moduleInfo = ModulesStore.value?.[data.module_id]

  const receivedTime = dayjs(data.created_at).isSame(dayjs(), 'day')
    ? dayjs(data.created_at).fromNow()
    : formatDateWithTime(data.created_at)

  const { mutate: markRead } = useMutation({
    mutationFn: (id: string) => markNotificationRead(id),
    onSuccess: () => {
      batchMarkRead(data.id)
    },
    onSettled: () => {
      navigateToModule(data)
    },
  })

  const handleClick = () => {
    if (data.is_read) {
      navigateToModule(data)
    } else {
      markRead(data.id)
    }
  }

  return (
    <Flex className={styles.item} gap={10} onClick={handleClick}>
      <div className={styles.icon}>
        {moduleInfo?.icon ? (
          <img
            className={styles.moduleIcon}
            src={`data:image/png;base64,${moduleInfo.icon}`}
            alt={moduleInfo.title}
          />
        ) : (
          <div className={styles.moduleIcon} />
        )}
      </div>
      <Flex vertical gap={5} className={styles.contentContainer}>
        <Ellipsis line={3} className={styles.content}>
          {data.message}
        </Ellipsis>
        <div>
          <span className={styles.time}>{receivedTime}</span>
          {data.company_name && (
            <span className={styles.time}>
              {' '}
              - {t.from} {data.company_name}
            </span>
          )}
        </div>
      </Flex>
      {!data.is_read && <div className={styles.dot} />}
    </Flex>
  )
}

export default Item
