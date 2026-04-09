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
    ORDER: 'order',
    CATEGORY: 'category',
    PRODUCT: 'product',
    INVENTORY: 'inventory',
    INVENTORY_LOG: 'inventory-log',
    CODE_GENERATOR: 'code-generator',
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
      {
        path: PATH_TREE.MANAGEMENT.ORDER,
        labelKey: 'menu.order',
        Element: lazy(() => import('src/pages/management/order')),
      },
      {
        path: PATH_TREE.MANAGEMENT.CATEGORY,
        labelKey: 'menu.category',
        Element: lazy(() => import('src/pages/management/category')),
      },
      {
        path: PATH_TREE.MANAGEMENT.PRODUCT,
        labelKey: 'menu.product',
        Element: lazy(() => import('src/pages/management/product')),
      },
      {
        path: PATH_TREE.MANAGEMENT.INVENTORY,
        labelKey: 'menu.inventory',
        Element: lazy(() => import('src/pages/management/inventory')),
      },
      {
        path: PATH_TREE.MANAGEMENT.INVENTORY_LOG,
        labelKey: 'menu.inventoryLog',
        Element: lazy(() => import('src/pages/management/inventory-log')),
      },
      {
        path: PATH_TREE.MANAGEMENT.CODE_GENERATOR,
        labelKey: 'menu.codeGenerator',
        Element: lazy(() => import('src/pages/management/code-generator')),
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
