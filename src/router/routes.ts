import { lazy } from 'react'

export interface RouteNode {
  index?: string
  path: string
  labelKey?: string
  icon?: string
  hidden?: boolean
  required?: string[]
  requiredOneOf?: boolean
  Element?: React.LazyExoticComponent<() => React.ReactNode>
  children?: RouteNode[]
  hideSidebar?: boolean
}

export const PATH_TREE = {
  NOT_FOUND: '/404',
  LOGIN: '/login',
  LOGOUT: '/logout',
  LOGOUT_CHANNEL: '/logout-channel',
  HOME: '/',
  MANAGEMENT: {
    ROOT: 'management',
    CUSTOMER: 'customer',
  },
  SETTING: {
    ROOT: 'setting',
    GENERAL_SETTING: 'general',
  },
}

export const ERROR_ROUTES: RouteNode[] = [
  {
    path: PATH_TREE.NOT_FOUND,
    Element: lazy(() => import('src/pages/master/404')),
  },
]

export const PUBLIC_ROUTES: RouteNode[] = [
  {
    path: PATH_TREE.LOGIN,
    Element: lazy(() => import('src/pages/master/newlogin')),
  },
  {
    path: PATH_TREE.LOGOUT_CHANNEL,
    Element: lazy(() => import('src/pages/master/logout')),
  },
]

export const PRIVATE_ROUTES: RouteNode[] = [
  {
    path: '*',
    Element: lazy(() => import('src/pages/module-container')),
  },
]

export const ROUTE_TREE: RouteNode[] = [
  {
    path: PATH_TREE.HOME,
    labelKey: 'menu.home',
    icon: 'sax:home-2',
    Element: lazy(() => import('src/pages/home')),
  },
  {
    path: PATH_TREE.MANAGEMENT.ROOT,
    labelKey: 'menu.management',
    icon: 'sax:setting-1',
    children: [
      {
        path: PATH_TREE.MANAGEMENT.CUSTOMER,
        labelKey: 'menu.customer',
        Element: lazy(() => import('src/pages/management/customer')),
      },
    ],
  },
  {
    path: PATH_TREE.SETTING.ROOT,
    labelKey: 'menu.setting',
    icon: 'sax:setting-1',
    children: [
      {
        path: PATH_TREE.SETTING.GENERAL_SETTING,
        labelKey: 'menu.generalSetting',
        Element: lazy(() => import('src/pages/setting/general-setting')),
      },
    ],
  },
]
