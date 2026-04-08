import { NotificationMessage } from 'src/entities/notification/types'

export interface NotificationItem extends NotificationMessage {}

export interface NotificationTimeGroup {
  title: string
  items: NotificationItem[]
}
