import { useState } from 'react'

import { IUserAndGroupInfo } from '../../entities/user-management'

import SelectorPopup from './SelectorPopup'
import MemberGroupSelect, { MemberSelectProps } from './MemberGroupSelect'

interface IProps extends MemberSelectProps {
  isShare?: boolean
  autoUngroup?: boolean
  onLoadValueData?: (value: IUserAndGroupInfo[]) => void
}

const Index = ({
  className,
  value = [],
  options = [],
  isShare,
  autoUngroup,
  onChange,
  onLoadValueData,
  ...otherProps
}: IProps) => {
  const [popupVisible, setPopupVisible] = useState(false)

  const openPopup = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('.ant-select-clear')) {
      onChange?.([])
      return
    }
    if (!otherProps.disabled) {
      setPopupVisible(true)
    }
  }

  const closePopup = () => {
    setPopupVisible(false)
  }

  const handleChange = (value: IUserAndGroupInfo[]) => {
    onChange?.(value)
    closePopup()
  }

  return (
    <>
      <MemberGroupSelect
        maxTagCount={5}
        styles={{
          popup: {
            root: { display: 'none' },
          },
        }}
        value={value}
        onClick={openPopup}
        onLoadData={onLoadValueData}
        {...otherProps}
      />

      <SelectorPopup
        open={popupVisible}
        isShare={isShare}
        value={value}
        autoUngroup={autoUngroup}
        onClose={closePopup}
        onChange={handleChange}
      />
    </>
  )
}

export default Index
