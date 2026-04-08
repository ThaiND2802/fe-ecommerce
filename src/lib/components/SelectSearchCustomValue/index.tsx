import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Input } from 'antd'

import Select, { ISelectProps } from '../SelectCustomValue'
import IconSax from '../IconSax'
import { textSearch } from '../../utils/search'

export interface SelectSearchProps<T> extends ISelectProps<T> {
  search?: (input: string, option: T) => boolean
  defaultFilter?: string
  noSearch?: boolean
  searchPlaceholder?: string
  onDataChange?: (data: T[]) => void
}

const SelectSearch = <T,>({
  search,
  defaultFilter,
  noSearch = false,
  searchPlaceholder,
  onDataChange,
  ...otherProps
}: SelectSearchProps<T>) => {
  const [filter, setFilter] = useState(defaultFilter)
  const labelKey = otherProps.fieldNames?.label || 'label'
  const filterInputRef = useRef(null)

  const onDropdownVisibleChange = (open: boolean) => {
    if (open) {
      setTimeout(() => {
        filterInputRef.current?.focus()
      }, 500)
    }
  }

  const optionsToRender = useMemo(
    () =>
      filter
        ? otherProps.options?.filter((option) =>
            search ? search(filter, option as T) : textSearch(option[labelKey], filter),
          )
        : otherProps.options,
    [filter, otherProps.options, search],
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
              placeholder={searchPlaceholder}
            />
          </div>
        )}
        {menu}
      </>
    )
  }

  useEffect(() => {
    onDataChange?.(otherProps.options as T[])
  }, [otherProps.options])

  return (
    <Select
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
