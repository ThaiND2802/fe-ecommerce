import { notification, Flex } from 'antd'
import { useEffect } from 'react'
import { ArgsProps } from 'antd/es/notification'

import Icon from './icon'
import styles from './index.module.less'

type NotificationApi = ReturnType<typeof notification.useNotification>[0]

let notificationApiInstance: NotificationApi | null = null

const setNotificationApi = (api: NotificationApi) => {
  notificationApiInstance = api
}

interface INotify extends Omit<ArgsProps, 'type'> {
  type: 'success' | 'error' | 'loading'
}

export const notify = (config: INotify) => {
  if (!notificationApiInstance) {
    return
  }

  notificationApiInstance.open({
    placement: 'bottomLeft',
    duration: 3,
    ...config,
    className: styles.appNotification,
    message: (
      <Flex align="center" vertical>
        <Icon type={config.type} />
        <span className={styles.notificationMessage}>{config.message}</span>
      </Flex>
    ),
    type: undefined,
  })
}

export const destroyNotify = (key: string) => {
  if (!notificationApiInstance) {
    return
  }
  notificationApiInstance.destroy(key)
}

export const useNotificationApi = () => {
  if (!notificationApiInstance) {
    throw new Error('Not found notification api')
  }
  return notificationApiInstance
}

const Index = () => {
  const [api, contextHolder] = notification.useNotification()

  useEffect(() => {
    setNotificationApi(api)
    return () => {
      notificationApiInstance = null
    }
  }, [api])

  return contextHolder
}

export default Index
