import { useEffect } from 'react'

const bc = new BroadcastChannel('app-event')

const LogoutPage = () => {
  useEffect(() => {
    bc.postMessage({ type: 'LOGOUT_CHANNEL' })
  }, [])

  return null
}

export default LogoutPage
