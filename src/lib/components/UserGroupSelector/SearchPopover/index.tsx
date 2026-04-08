import { useRef } from 'react'
import { Input, InputProps, InputRef, Popover, PopoverProps } from 'antd'
import cn from 'classnames'

import IconSax, { IconProps } from '../../IconSax'
import useLocale from '../../../locales/useLocale'

import styles from './index.module.less'

interface IProps extends PopoverProps {
  searchValue?: string
  inputProps?: InputProps
  iconProps?: Omit<IconProps, 'name'>
  focusTimeout?: number
  searchPlaceholder?: string
}

const Index = ({
  searchValue,
  inputProps,
  iconProps,
  searchPlaceholder,
  focusTimeout = 100,
  ...otherProps
}: IProps) => {
  const [t] = useLocale('UserGroupSelector')
  const inputRef = useRef<InputRef>(null)

  return (
    <Popover
      content={
        <Input
          className={styles.searchInput}
          autoFocus
          allowClear
          ref={inputRef}
          prefix={<IconSax name="search-normal-2" size={20} />}
          placeholder={searchPlaceholder || t.placeholder.searchSelectedMember}
          {...inputProps}
        />
      }
      placement="bottomRight"
      arrow={false}
      trigger="click"
      onOpenChange={(open) => {
        if (open) {
          setTimeout(() => {
            inputRef.current?.focus()
          }, focusTimeout)
        }
      }}
      {...otherProps}>
      <IconSax
        className={cn(styles.searchIcon, { [styles.active]: !!searchValue })}
        name="search-normal-2"
        size={20}
        {...iconProps}
      />
    </Popover>
  )
}

export default Index
