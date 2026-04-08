import { initializeApp } from 'firebase/app'
import { getMessaging } from 'firebase/messaging'
import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MEASUREMENT_ID,
} from 'src/environments/environment'

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
}

const app = (() => {
  let firebaseApp

  if (!firebaseConfig.apiKey) {
    return undefined
  }

  try {
    firebaseApp = initializeApp(firebaseConfig)
  } catch (error) {
    console.error('Error initializing Firebase:', error)
  }

  return firebaseApp
})()

const messaging = app ? getMessaging(app) : undefined

export { app, messaging }
