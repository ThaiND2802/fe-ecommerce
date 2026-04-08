import { useState, Activity } from 'react'
import { Button, Flex, Layout } from 'antd'
import { useTranslation } from 'react-i18next'

import AppLogo from 'src/assets/images/logo.svg'
import AppSwitcher from 'src/components/AppSwitcher'
import NotificationIcon from 'src/components/NotificationIcon'
import UserDropdown from 'src/components/UserDropdown'
import IconSax from 'src/components/IconSax'

import Profile from './components/profile/profile'
import ChangePassword from './components/change-password'
import LanguageMenu from 'src/layouts/main/components/language-menu'
import i18n from 'src/locales/i18n'
import usePageMode from 'src/hook/use-page-mode'

import styles from './header.module.less'

const { responsive } = globalThis.moduleConfig

const Header = () => {
  const [profileVisible, setProfileVisible] = useState(false)
  const [changePasswordVisible, setChangePasswordVisible] = useState(false)
  const [languageMenuVisible, setLanguageMenuVisible] = useState(false)
  const { isHiddenHeader } = usePageMode()
  const { i18n: i18nInstance } = useTranslation()

  const currentLanguage = i18nInstance.resolvedLanguage || i18nInstance.language

  const openLanguageMenu = () => {
    setLanguageMenuVisible(!languageMenuVisible)
  }

  const handleMenuClick = () => {
    globalThis.dispatchEvent(new CustomEvent('menuClick'))
  }

  return (
    <Activity mode={isHiddenHeader ? 'hidden' : 'visible'}>
      <Layout.Header className={styles.header}>
        {responsive && (
          <Button className={styles.menuButton} type="text" onClick={handleMenuClick}>
            <IconSax className={styles.menuIcon} name="hamburger-menu" size={24} />
          </Button>
        )}
        <Flex className={styles.logo}>
          <a href="/" className={styles.logoLink}>
            <img alt="logo" src={AppLogo} />
          </a>
        </Flex>
        <div className={styles.separator} />
        <div className={styles.moduleName}>
          {globalThis?.moduleConfig?.name?.[currentLanguage] || ''}
        </div>
        <Flex className={styles.globalActions}>
          {/* <Flex gap={10} align="center">
            <AppSwitcher />
            <NotificationIcon />
          </Flex> */}
          <UserDropdown
            onShowProfile={() => setProfileVisible(true)}
            onShowChangePassword={() => setChangePasswordVisible(true)}
            onShowLanguageSwitcher={openLanguageMenu}
          />
          <LanguageMenu
            visible={languageMenuVisible}
            onOpenChange={(visible) => {
              setLanguageMenuVisible(visible)
            }}
            onLanguageChange={(language) => {
              setLanguageMenuVisible(false)
              i18n.changeLanguage(language)
              globalThis.dispatchEvent(new CustomEvent('languageChanged', { detail: { language } }))
            }}
          />
        </Flex>

        {profileVisible && (
          <Profile open={profileVisible} onClose={() => setProfileVisible(false)} />
        )}
        {changePasswordVisible && (
          <ChangePassword
            open={changePasswordVisible}
            onClose={() => setChangePasswordVisible(false)}
          />
        )}
      </Layout.Header>
    </Activity>
  )
}

export default Header
