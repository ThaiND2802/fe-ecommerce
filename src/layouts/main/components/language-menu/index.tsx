import { Dropdown } from 'antd'

import useLocaleGroup from 'src/locales/useLocaleGroup'
import IconFlagEN from 'src/assets/icons/iconFlagEN.svg'
import IconFlagVI from 'src/assets/icons/iconFlagVI.svg'

const LanguageMenu = ({
  visible,
  onOpenChange,
  onLanguageChange,
}: {
  visible: boolean
  onOpenChange: (visible: boolean) => void
  onLanguageChange: (language: string) => void
}) => {
  const [t] = useLocaleGroup('language')
  return (
    <Dropdown
      open={visible}
      trigger={['click']}
      onOpenChange={onOpenChange}
      menu={{
        items: [
          {
            key: 'vi',
            label: t.vi,
            icon: <img src={IconFlagVI} alt="vi" />,
            onClick: () => onLanguageChange('vi'),
          },
          {
            key: 'en',
            label: t.en,
            icon: <img src={IconFlagEN} alt="en" />,
            onClick: () => onLanguageChange('en'),
          },
        ],
      }}>
      <div style={{ width: 1, height: 36, visibility: 'hidden' }} />
    </Dropdown>
  )
}

export default LanguageMenu
