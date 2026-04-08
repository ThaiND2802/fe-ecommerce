import { useMemo, useRef } from 'react'

import NavigateMenu, { MenuItem } from 'src/lib/components/NavigateMenu'
import IconSax from 'src/lib/components/IconSax'
import Icon from 'src/lib/components/Icon'
import { usePermission } from 'src/lib/entities/user-management'

import useLocaleGroup from 'src/locales/useLocaleGroup'
import { ROUTE_TREE, RouteNode } from 'src/router/routes'

import TopButtons from './buttons'

const MenuLeft = ({
  collapsed,
  noPermissionHidden,
  noRightPadding,
  onMenuClick,
}: {
  collapsed: boolean
  noPermissionHidden?: boolean
  noRightPadding?: boolean
  onMenuClick?: (menu: MenuItem) => void
}) => {
  const [_t, trans] = useLocaleGroup('menu')
  const pathTrace = useRef<string[]>([])

  // const { data: permissions } = usePermission({
  //   enabled: noPermissionHidden,
  // })

  // const checkPermission = (item: RouteNode) => {
  //   return item.requiredOneOf
  //     ? item.required?.some((permission) =>
  //       permissions?.menuPermissions?.some((item) => item.code === permission),
  //     )
  //     : item.required?.every((permission) =>
  //       permissions?.menuPermissions?.some((item) => item.code === permission),
  //     )
  // }

  const parseMenuItem = (item: RouteNode) => {
    if (item.hidden) {
      return null
    }
    // if (noPermissionHidden && item.required?.length && !checkPermission(item)) {
    //   return null
    // }

    pathTrace.current.push(item.path)

    const [iconType, iconName] = item.icon?.split(':') || []
    let icon = null
    if (iconType && iconName) {
      if (iconType === 'sax') {
        icon = <IconSax name={iconName} size={20} />
      }
      if (iconType === 'icon') {
        icon = <Icon name={iconName} size={20} />
      }
    }

    const childrenMenu = item.children
      ? item.children.map(parseMenuItem).filter(Boolean)
      : undefined
    let menuItem = {
      ...item,
      label: trans(item.labelKey),
      key: pathTrace.current.join('/'),
      icon,
      children: childrenMenu?.length ? childrenMenu : undefined,
    }

    pathTrace.current.pop()

    if (!menuItem.Element && !menuItem.children?.length) {
      return null
    }

    delete menuItem.labelKey
    delete menuItem.Element
    return menuItem
  }

  const items = useMemo(() => {
    pathTrace.current = []
    return ROUTE_TREE.map(parseMenuItem).filter(Boolean)
  }, [trans])

  return (
    <NavigateMenu
      collapsed={collapsed}
      items={items}
      topButtons={<TopButtons collapsed={collapsed} />}
      onMenuClick={onMenuClick}
      rightPadding={noRightPadding ? 0 : undefined}
    />
  )
}

export default MenuLeft
