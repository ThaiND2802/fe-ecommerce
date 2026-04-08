import { useEffect } from 'react'
import { Drawer } from 'antd'
import classNames from 'classnames'

import PageLayout from 'src/lib/components/PageLayout'
import { useScreen } from 'src/lib/hooks/screen'
import { useStore } from 'src/store'
import Logo from 'src/assets/logo-full.svg'

import MenuLeft from '../MenuLeft'
import styles from './index.module.less'

const { responsive } = globalThis.moduleConfig

const Index = ({
  className,
  noPermissionHidden,
  allowToggle = true,
}: {
  className?: string
  noPermissionHidden?: boolean
  allowToggle?: boolean
}) => {
  const menuCollapsed = useStore((state) => state.menuCollapsed)
  const setMenuCollapsed = useStore((state) => state.setMenuCollapsed)
  const mobileMenuOpen = useStore((state) => state.mobileMenuOpen)
  const setMobileMenuOpen = useStore((state) => state.setMobileMenuOpen)

  const { isMobile } = useScreen()

  useEffect(() => {
    const handleOpenMenu = () => {
      useStore.setState((state) => ({ mobileMenuOpen: !state.mobileMenuOpen }))
    }

    globalThis.addEventListener('menuClick', handleOpenMenu)

    return () => globalThis.removeEventListener('menuClick', handleOpenMenu)
  }, [])

  if (isMobile && responsive) {
    return (
      <Drawer
        className={styles.drawer}
        title={
          <a href="/">
            <img src={Logo} alt="logo" />
          </a>
        }
        open={mobileMenuOpen}
        placement="left"
        onClose={() => setMobileMenuOpen(false)}
        width={232}>
        <MenuLeft collapsed={false} onMenuClick={() => setMobileMenuOpen(false)} />
      </Drawer>
    )
  }

  return (
    <PageLayout.Sider
      className={classNames(styles.sider, className, {
        [styles.allowToggle]: allowToggle,
      })}
      allowToggle={allowToggle}
      collapsed={menuCollapsed}
      autoHideToggleButton={!navigator?.maxTouchPoints}
      onCollapse={setMenuCollapsed}>
      <MenuLeft
        collapsed={menuCollapsed}
        noPermissionHidden={noPermissionHidden}
        {...(allowToggle ? {} : { noRightPadding: true })}
      />
    </PageLayout.Sider>
  )
}

export default Index
