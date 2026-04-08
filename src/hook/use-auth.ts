import { useEffect, useSyncExternalStore } from 'react'

import { bootstrapSession, getAuthSnapshot, subscribeAuth } from 'src/auth'

export const useAuth = () => {
  const auth = useSyncExternalStore(subscribeAuth, getAuthSnapshot, getAuthSnapshot)

  useEffect(() => {
    if (auth.isBootstrapping) {
      bootstrapSession()
    }
  }, [auth.isBootstrapping])

  return {
    ...auth,
    isAuthenticated: Boolean(auth.accessToken),
  }
}
