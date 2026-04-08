import React, { useEffect } from 'react'

import Loader from 'src/components/Loader'
import { useAuth } from 'src/hook/use-auth'
import { useProtectedRedirect } from 'src/hook/redirect'
import UserWrapper from 'src/router/UserWrapper'

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  // const redirect = useProtectedRedirect()
  // const { isAuthenticated, isBootstrapping } = useAuth()

  // useEffect(() => {
  //   if (!isBootstrapping && !isAuthenticated) {
  //     redirect()
  //   }
  // }, [isAuthenticated, isBootstrapping, redirect])

  // if (isBootstrapping || !isAuthenticated) {
  //   return <Loader />
  // }

  return <UserWrapper>{children}</UserWrapper>
}

export default ProtectedRoute
