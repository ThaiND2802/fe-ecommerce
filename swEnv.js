import dotenv from 'dotenv'
import * as fs from 'fs'

dotenv.config({ path: '.env' })

const firebaseJs = fs.readFileSync('./src/assets/firebase-messaging-sw.js', 'utf-8')

fs.writeFileSync(
  './dist/firebase-messaging-sw.js',
`const process = {
  env: {
    VITE_PUBLIC_FIREBASE_API_KEY: '${process.env.VITE_APP_FIREBASE_API_KEY}',
    VITE_PUBLIC_FIREBASE_AUTH_DOMAIN: '${process.env.VITE_APP_FIREBASE_AUTH_DOMAIN}',
    VITE_PUBLIC_FIREBASE_PROJECT_ID: '${process.env.VITE_APP_FIREBASE_PROJECT_ID}',
    VITE_PUBLIC_FIREBASE_STORAGE_BUCKET: '${process.env.VITE_APP_FIREBASE_STORAGE_BUCKET}',
    VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: '${process.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID}',
    VITE_PUBLIC_FIREBASE_APP_ID: '${process.env.VITE_APP_FIREBASE_APP_ID}',
  }
}

${firebaseJs}`)
