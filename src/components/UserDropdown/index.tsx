import { useState } from 'react'
import { Avatar, Dropdown, Flex, Menu, MenuProps } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

import { logout } from 'src/auth'
import styles from './index.module.less'
import { useUser } from 'src/hook/use-user'
import useLocaleGroup from 'src/locales/useLocaleGroup'
import IconFlagVI from 'src/assets/icons/iconFlagVI.svg'
import IconFlagEN from 'src/assets/icons/iconFlagEN.svg'
import { formatBase64Image } from 'src/utils/string.utils'

interface IUserDropdownProps {
  onShowProfile: () => void
  onShowChangePassword: () => void
  onShowLanguageSwitcher: () => void
}

const UserDropdown = ({
  onShowProfile,
  onShowChangePassword,
  onShowLanguageSwitcher,
}: IUserDropdownProps) => {
  const { data: userInfo } = useUser(true)
  const [t] = useLocaleGroup('header')
  const [tLang] = useLocaleGroup('language')
  const { i18n } = useTranslation()
  const [visible, setVisible] = useState(false)
  const currentLanguage = i18n.resolvedLanguage || i18n.language
  const isVietnamese = currentLanguage === 'vi'

  const doLogout = () => {
    logout()
  }
  const menuItems: MenuProps['items'] = [
    {
      type: 'divider',
    },
    {
      key: 'change-password',
      label: t.userDropdown.changePassword,
      onClick: onShowChangePassword,
    },
    {
      key: 'change-language',
      label: (
        <Flex>
          <div style={{ flex: 1 }}>{t.userDropdown.changeLanguage}</div>
          <Flex style={{ alignItems: 'center' }}>
            <span className={styles.languageShort}>
              {isVietnamese ? tLang.viShort : tLang.enShort}
            </span>
            <img className={styles.languageFlag} src={isVietnamese ? IconFlagVI : IconFlagEN} />
          </Flex>
        </Flex>
      ),
      onClick: onShowLanguageSwitcher,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: t.userDropdown.logout,
      onClick: doLogout,
    },
  ]

  const dropdownRender = () => {
    return (
      <Flex key={currentLanguage} className={styles.userDropdown}>
        <Flex className={styles.userInfo}>
          <Avatar
            className={styles.userAvatar}
            size={75}
            src={formatBase64Image(userInfo?.image)}
            icon={<UserOutlined />}
          />
          <div>
            <div className={styles.userName}>{userInfo?.fullName || 'Nguyen van a'}</div>
            <div className={styles.userEmail}>{userInfo?.email || 'nguyenvana@gmail.com'}</div>
            <Flex
              className={styles.userAccountLink}
              onClick={() => {
                setVisible(false)
                onShowProfile()
              }}>
              {t.userDropdown.viewAccount}
            </Flex>
          </div>
        </Flex>
        <Menu className={styles.userMenu} items={menuItems} />
      </Flex>
    )
  }

  return (
    <Dropdown
      open={visible}
      onOpenChange={setVisible}
      trigger={['click']}
      dropdownRender={dropdownRender}
    >
      <Avatar
        size={36}
        src={formatBase64Image(userInfo?.image)}
        icon={<UserOutlined />}
        style={{ flexShrink: 0 }}
      />
    </Dropdown>
  )
}

export default UserDropdown
