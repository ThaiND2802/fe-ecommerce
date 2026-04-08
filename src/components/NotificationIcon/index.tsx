import { Badge, Popover } from 'antd'
import { useSignals } from '@preact/signals-react/runtime'

import IconSax from 'src/components/IconSax'
import IconWrapper from 'src/components/IconWrapper'
import Notifications from 'src/components/Notifications'

import DataLoader from './data-loader'
import NotificationStore from 'src/store/notification'
import styles from './index.module.less'

const { systemModule } = globalThis.moduleConfig

const Index = () => {
  useSignals()
  const { unreadCount } = NotificationStore

  if (systemModule) return null

  return (
    <>
      <DataLoader />
      <Badge className={styles.badge} count={unreadCount.value} offset={[-10, 10]}>
        <Popover
          classNames={{
            root: styles.overlay,
          }}
          placement="bottomRight"
          content={<Notifications />}
          arrow={false}
          align={{ offset: [50, 0] }}
          trigger="click">
          <IconWrapper>
            <IconSax className={styles.icon} name="bell-1" size={20} />
          </IconWrapper>
        </Popover>
      </Badge>
    </>
  )
}

export default Index
