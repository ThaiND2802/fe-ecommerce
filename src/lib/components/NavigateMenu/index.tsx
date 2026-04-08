import { useEffect, useMemo, useState, useEffectEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SimpleBar from 'simplebar-react'

import Menu, { MenuProps } from '../Menu'
import styles from './index.module.less'

interface IProps extends MenuProps {
  collapsed?: boolean
  topButtons?: React.ReactNode
  rightPadding?: number
  onMenuClick?: (menu: MenuItem) => void
}
export type MenuItem = Required<MenuProps>['items'][number] & {
  path?: string
  children?: MenuItem[]
}

const searchKey = (pathnameParts: string[], menuItems: MenuItem[], keys: string[]) => {
  const match = menuItems.find((item) => {
    const keyOrPath = item.path || item.key
    const key = typeof keyOrPath === 'string' ? keyOrPath.split('/').pop() : keyOrPath
    return key === pathnameParts[0]
  })

  if (match) {
    if ('children' in match && pathnameParts.length > 1 && match?.children) {
      return searchKey(pathnameParts.slice(1), match.children, [...keys, match.key as string])
    } else {
      return [...keys, match.key as string]
    }
  } else {
    return keys
  }
}

const getActiveKeys = (pathname: string, menuItems: MenuItem[]) => {
  const pathnameParts = pathname.split('/').slice(1)
  const keys = searchKey(pathnameParts, menuItems, [])
  return keys
}

const Index = ({ collapsed, topButtons, onMenuClick, rightPadding = 16, ...props }: IProps) => {
  const [defaultOpenKeys, setDefaultOpenKeys] = useState<string[]>([])
  const location = useLocation()
  const navigate = useNavigate()

  const handleSelect: MenuProps['onSelect'] = (menu) => {
    if (menu.keyPath) {
      navigate(menu.keyPath[0])
    }

    onMenuClick?.(menu)
  }

  const activeKeys = useMemo(
    () => getActiveKeys(location.pathname, props.items),
    [location.pathname, props.items],
  )

  const checkDefaultOpenKeys = useEffectEvent(() => {
    if (!collapsed && !defaultOpenKeys?.[0] && activeKeys.length) {
      setDefaultOpenKeys([activeKeys[0]])
    }
  })

  useEffect(() => {
    if (!collapsed) {
      const pathname = location.pathname
      const pathnameParts = pathname.split('/')
      const parentKey = pathnameParts[1]
      setDefaultOpenKeys([parentKey])
    }
  }, [collapsed])

  useEffect(() => checkDefaultOpenKeys, [activeKeys, defaultOpenKeys])

  return (
    <div className={styles.menuWrapper}>
      {topButtons && <div style={{ paddingRight: rightPadding }}>{topButtons}</div>}

      <SimpleBar
        className={styles.menuOuter}
        style={{ '--right-padding': `${rightPadding}px` } as React.CSSProperties}>
        <Menu
          key={defaultOpenKeys[0] || 'menu'}
          className={styles.menu}
          mode="inline"
          selectedKeys={activeKeys}
          defaultOpenKeys={defaultOpenKeys}
          onClick={handleSelect}
          {...props}
        />
      </SimpleBar>
    </div>
  )
}

export default Index
