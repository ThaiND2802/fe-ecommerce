import React, { useEffect, useRef, useState } from 'react'
import { Select as AntdSelect, SelectProps } from 'antd'
import classNames from 'classnames'

export interface ISelectProps<T> extends SelectProps {
  parseValue?: (value: T) => any
  loadMore?: () => void
  useCustomValue?: boolean
}

const Select = <T,>({
  className,
  value,
  loadMore,
  parseValue,
  useCustomValue,
  onChange,
  ...otherProps
}: ISelectProps<T>) => {
  const [selectValue, setSelectValue] = useState<string[] | string>([])
  const [customValue, setCustomValue] = useState<T[] | T>()
  const initialValueRef = useRef<{ [key: string]: any }>({})

  const valueField = otherProps.fieldNames?.value || 'value'

  const innerOnChange = (v: any, option: any) => {
    setSelectValue(v)
    setCustomValue(option ?? '')
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { target } = e
    if (
      (target as HTMLDivElement).scrollHeight - (target as HTMLDivElement).scrollTop ===
      (target as HTMLDivElement).clientHeight
    ) {
      loadMore()
    }
  }

  useEffect(() => {
    if (!useCustomValue) return
    if (Array.isArray(value)) {
      for (const item of value) {
        if (!initialValueRef.current[item?.[valueField]]) {
          initialValueRef.current[item?.[valueField]] = item
        }
      }
    }
    if (Array.isArray(value)) {
      setSelectValue(value.map((item) => item?.[valueField]))
    } else if (typeof value === 'object') {
      setSelectValue(value[valueField])
    } else {
      setSelectValue(value)
    }
  }, [value])

  useEffect(() => {
    if (customValue !== undefined) {
      if (Array.isArray(customValue)) {
        onChange?.(
          customValue.map(
            (item) =>
              initialValueRef.current[item?.[valueField]] ?? (parseValue ? parseValue(item) : item),
          ),
        )
      } else {
        onChange?.(parseValue ? parseValue(customValue) : customValue)
      }
    }
  }, [customValue])

  return (
    <AntdSelect
      className={classNames(className)}
      {...(loadMore ? { onPopupScroll: handleScroll } : {})}
      {...otherProps}
      value={useCustomValue ? selectValue : value}
      onChange={useCustomValue ? innerOnChange : onChange}
    />
  )
}

export default Select
