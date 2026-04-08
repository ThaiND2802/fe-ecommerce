import { useNavigate } from 'react-router-dom'

import { clearSession, logout } from 'src/auth'
import { PATH_TREE } from 'src/router/routes'

export const useProtectedRedirect = () => {
  const navigate = useNavigate()

  const redirect = () => {
    const location = globalThis.location
    const routeUrl = `${location.pathname}${location.search}`
    const redirectUrl =
      routeUrl === '/' || routeUrl === PATH_TREE.LOGOUT ? '' : encodeURIComponent(routeUrl)

    navigate({
      pathname: `${PATH_TREE.LOGIN}`,
      search: redirectUrl ? `route_url=${redirectUrl}` : '',
    })
  }

  return redirect
}

export const useRedirectLoggedIn = () => {
  const navigate = useNavigate()

  const redirect = (path?: string) => {
    if (path) {
      navigate({
        pathname: path.split('?')[0],
        search: path.split('?')[1],
      })
    } else {
      navigate(PATH_TREE.HOME)
    }
  }

  return redirect
}

export const useNoAccessRedirect = () => {
  const navigate = useNavigate()

  const redirect = async () => {
    await clearSession()
    navigate(PATH_TREE.LOGIN)
  }

  return redirect
}

export { logout }
