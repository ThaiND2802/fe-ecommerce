import React, { useEffect } from 'react'

import { useUser } from 'src/hook/use-user'
import { setEncryptedItem } from 'src/utils/storage'
import { USER_KEY } from 'src/constants/app'
import Oops from 'src/components/Oops'
import Loader from 'src/components/Loader'
import { useNoAccessRedirect } from 'src/hook/redirect'
import { ERROR_CODE } from 'src/constants/api'

const UserWrapper = ({ children }: { children: React.ReactElement }) => {
  // const { data: user, error, isLoading } = useUser(true)
  // const noAccessRedirect = useNoAccessRedirect()

  // useEffect(() => {
  //   if (user) {
  //     setEncryptedItem(USER_KEY, user)
  //   }
  // }, [user])

  // useEffect(() => {
  //   if (error) {
  //     const { response: { data: { errorCode } = {} } = {} } = error as any
  //     if (errorCode === ERROR_CODE.NO_ACCESS) {
  //       noAccessRedirect()
  //     }
  //   }
  // }, [error])

  // if (error) {
  //   return <Oops fullHeight />
  // }

  // if (isLoading || !user) {
  //   return <Loader />
  // }

  return children
}

export default UserWrapper
