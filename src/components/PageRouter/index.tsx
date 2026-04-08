import React, { Suspense } from 'react'

import ErrorBoundary from 'src/lib/components/ErrorBoundary'
import SystemPage from 'src/lib/components/SystemPage'
import { usePermission } from 'src/lib/entities/user-management'

const PageRouter = ({ children, required }: { children: React.ReactNode; required?: string[] }) => {
  // const permissionCheck = !!required?.length
  // const { error, isFetching, granted } = usePermission({
  //   enabled: permissionCheck,
  //   check: required,
  // })

  // if (permissionCheck && isFetching) {
  //   return <SystemPage page="loading" />
  // }

  // if (permissionCheck && (error || !granted)) {
  //   return <SystemPage page="no-permission" />
  // }

  return (
    <Suspense fallback={<SystemPage />}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </Suspense>
  )
}

export default PageRouter
