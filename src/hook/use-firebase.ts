import { useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { getToken, MessagePayload, onMessage } from 'firebase/messaging'

import { messaging } from 'src/firebase'
import { FIREBASE_VAPIKEY } from 'src/environments/environment'
import { setEncryptedItem } from 'src/utils/storage'
import { LOCAL_STORAGE_KEY } from 'src/constants'
import { addFirebaseNotification, FirebaseNotification } from 'src/store/notification'
import { useEffectEvent } from './index'

import { registerFirebaseToken } from 'src/entities/notification/api'

// const { disableNotification } = window.moduleConfig

const useFirebase = () => {
  const { mutate: registerToken } = useMutation({
    mutationFn: registerFirebaseToken,
  })

  const handleRegisterToken = useEffectEvent(() => {
    if (!messaging) return

    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission()
        if (permission === 'granted') {
          const token = await getToken(messaging, {
            vapidKey: FIREBASE_VAPIKEY,
          })
          if (token) {
            setEncryptedItem(LOCAL_STORAGE_KEY.FCM_TOKEN, token)
            registerToken({ token })
          }
        } else {
          console.log('Unable to get permission to notify.')
        }
      } catch (error) {
        console.error('An error occurred while requesting permission:', error)
      }
    }

    requestPermission()

    onMessage(messaging, (payload: MessagePayload) => {
      addFirebaseNotification(payload as FirebaseNotification)

      const notification = new Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: payload.notification.icon,
      })

      notification.onclick = () => {
        window.focus()
        notification.close()
      }
    })
  })

  useEffect(() => {
    handleRegisterToken()
  }, [])

  return {}
}

export default useFirebase
