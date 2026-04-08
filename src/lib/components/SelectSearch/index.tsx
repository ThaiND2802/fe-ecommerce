import React, { useMemo, useRef, useState } from 'react'
import { Input, Select, SelectProps } from 'antd'
import cn from 'classnames'

import IconSax from '../IconSax'
import { textSearch } from '../../utils/search'

import styles from './index.module.less'

export interface SelectSearchProps<T> extends SelectProps<string | T | T[], T> {
  search?: (input: string, option: T) => boolean
  defaultFilter?: string
  noSearch?: boolean
  exclude?: string[]
  defaultDisabledCursor?: boolean
}

const SelectSearch = <T,>({
  search,
  className,
  defaultFilter,
  noSearch = false,
  exclude,
  defaultDisabledCursor,
  ...otherProps
}: SelectSearchProps<T>) => {
  const [filter, setFilter] = useState(defaultFilter)
  const labelKey = otherProps.fieldNames?.label || 'label'
  const valueKey = otherProps.fieldNames?.value || 'value'
  const filterInputRef = useRef(null)

  const onDropdownVisibleChange = (open: boolean) => {
    if (open) {
      setTimeout(() => {
        filterInputRef.current?.focus()
      }, 500)
    }
  }

  const optionsExcluded = useMemo(() => {
    return otherProps.options?.filter((option) => !exclude?.includes(option[valueKey]))
  }, [otherProps.options, exclude])

  const optionsToRender = useMemo(
    () =>
      filter
        ? optionsExcluded?.filter((option) =>
            search ? search(filter, option) : textSearch(option[labelKey], filter),
          )
        : optionsExcluded,
    [filter, optionsExcluded, search],
  )

  const dropdownRender = (menu: React.ReactNode) => {
    return (
      <>
        {!noSearch && (
          <div style={{ padding: '4px 0 8px' }}>
            <Input
              ref={filterInputRef}
              prefix={<IconSax name="search-normal-2" size={12} />}
              allowClear
              onKeyDown={(e) => {
                e.stopPropagation()
              }}
              onChange={(e) => {
                setFilter(e.target.value)
              }}
            />
          </div>
        )}
        {menu}
      </>
    )
  }

  return (
    <Select
      className={cn(styles.select, { [styles.defaultCursor]: defaultDisabledCursor }, className)}
      popupRender={dropdownRender}
      menuItemSelectedIcon={false}
      showSearch={false}
      onOpenChange={onDropdownVisibleChange}
      {...otherProps}
      options={optionsToRender}
    />
  )
}

export default SelectSearch
