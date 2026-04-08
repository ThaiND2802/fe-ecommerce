import { signal } from '@preact/signals-react'

export interface FirebaseNotification {
  messageId: string
  notification: {
    title: string
    body: string
    image: string
  }
}

const notificationStore = {
  notifications: signal<FirebaseNotification[]>([]),
  unreadCount: signal(0),
}

export function addFirebaseNotification(message: FirebaseNotification) {
  notificationStore.notifications.value = [...notificationStore.notifications.value, message]
}

export default notificationStore
