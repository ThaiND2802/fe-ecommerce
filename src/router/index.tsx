import { Routes, Route, BrowserRouter } from 'react-router-dom'

import PageRouter from 'src/components/PageRouter'
import { ErrorBoundary } from 'react-error-boundary'


import { ERROR_ROUTES, PATH_TREE, PRIVATE_ROUTES, PUBLIC_ROUTES, ROUTE_TREE, RouteNode } from './routes'
import ProtectedRoute from './ProtectedRoute'
import MainLayout from 'src/layouts/main/main.layout'
import { uniqueId } from 'lodash'
import Layout from 'src/components/Layout'

const NotFound = () => {
  globalThis.location.replace('/404')
  return null
}

const noPermissionHidden = true

const ModuleRouter = () => {
  // const { error, isFetching } = usePermission({
  //   enabled: noPermissionHidden,
  // })

  const renderRoute = (routeNodes: RouteNode[]) => {
    if (!routeNodes?.length) {
      return null
    }

    return routeNodes.map(({ path, required, Element, children }) => {
      return (
        <Route key={path} path={path}>
          {Element && (
            <Route
              index
              element={
                <PageRouter key={path} required={required}>
                  <Element />
                </PageRouter>
              }
            />
          )}
          {renderRoute(children)}
        </Route>
      )
    })
  }

  // if (noPermissionHidden && isFetching) {
  //   return (
  //     <Flex
  //       justify="center"
  //       align="center"
  //       style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0 }}>
  //       <Spin spinning />
  //     </Flex>
  //   )
  // }

  // if (noPermissionHidden && error) {
  //   return <SystemPage alone page="error" />
  // }

  const renderPublicRoutes = (routes: RouteNode[]) =>
    routes.map((route) => {
      const { Element: Element, path } = route
      return <Route key={path} path={path} element={<Element />}></Route>
    })

  return (
    <BrowserRouter>
      <Routes>
        <Route>{renderPublicRoutes(ERROR_ROUTES)}</Route>
        <Route>{renderPublicRoutes(PUBLIC_ROUTES)}</Route>
        <Route
          key={uniqueId('__page__')}
          path='*'
          element={
            <ProtectedRoute>
              <MainLayout>
                <ErrorBoundary fallback={<div></div>}>
                  <Routes>
                    <Route path={PATH_TREE.HOME} element={<Layout />}>
                      {renderRoute(ROUTE_TREE)}
                    </Route>
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </ErrorBoundary>
              </MainLayout>
            </ProtectedRoute>
          } >

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default ModuleRouter
