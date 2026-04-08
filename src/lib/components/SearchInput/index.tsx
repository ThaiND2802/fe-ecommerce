import React from 'react'
import { Input, InputProps } from 'antd'
import classNames from 'classnames'

import IconSax from '../IconSax'

import styles from './index.module.less'

interface SearchInputProps extends InputProps {
  prefixIcon?: React.ReactNode
}

const SearchInput = ({ className, prefixIcon, ...props }: SearchInputProps) => {
  return (
    <Input
      className={classNames(styles.searchInput, className)}
      {...props}
      prefix={<IconSax name="search-normal-2" size={20} />}
    />
  )
}

export default SearchInput
