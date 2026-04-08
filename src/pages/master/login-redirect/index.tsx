import { useEffect } from 'react'

import { PATH_TREE } from 'src/router/routes'

const LoginRedirectPage = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(globalThis.location.search)
    const loginRedirect = urlParams.get('route_url')

    globalThis.location.replace(
      loginRedirect ? `${PATH_TREE.LOGIN}?route_url=${loginRedirect}` : PATH_TREE.LOGIN,
    )
  }, [])

  return null
}

export default LoginRedirectPage
