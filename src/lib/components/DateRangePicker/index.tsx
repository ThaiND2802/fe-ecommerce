import { useRef, useEffect } from 'react'
import { Flex } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import useMergedState from 'rc-util/lib/hooks/useMergedState'

import DatePicker, { IProps as DatePickerProps } from 'src/lib/components/DatePicker'
import IconSax from 'src/lib/components/IconSax'

type DateValue = Dayjs | string

interface IProps extends Omit<DatePickerProps, 'onChange' | 'value' | 'defaultValue'> {
  value?: [DateValue, DateValue]
  startProps?: DatePickerProps
  endProps?: DatePickerProps
  defaultValue?: [DateValue, DateValue]
  onChange?: (value: [DateValue, DateValue]) => void
}

const Index = ({ value, onChange, startProps, endProps, defaultValue, ...otherProps }: IProps) => {
  const [mergedValue, setMergedValue] = useMergedState<[DateValue, DateValue]>(
    defaultValue || [undefined, undefined],
    {
      value,
      onChange,
    },
  )

  const tempValueRef = useRef<[DateValue, DateValue]>(defaultValue || [undefined, undefined])

  useEffect(() => {
    tempValueRef.current = [value?.[0], value?.[1]]
  }, [value])

  const onFromDateChange = (date: DateValue) => {
    const djsDate = dayjs(date)

    if (!date && mergedValue?.[1]) {
      setMergedValue([undefined, mergedValue?.[1]])
      tempValueRef.current = [null, mergedValue?.[1]]
      return
    }

    tempValueRef.current = [date, tempValueRef.current?.[1]]

    if (tempValueRef.current?.[1] && djsDate.isAfter(tempValueRef.current?.[1])) {
      tempValueRef.current = [date, null]
      setMergedValue(tempValueRef.current)
    } else {
      tempValueRef.current = [date, tempValueRef.current?.[1]]
      if (tempValueRef.current?.[0] && tempValueRef.current?.[1]) {
        setMergedValue(tempValueRef.current)
      }
    }
  }

  const onToDateChange = (date: DateValue) => {
    const djsDate = dayjs(date)

    if (!date && mergedValue?.[0]) {
      setMergedValue([mergedValue?.[0], null])
      tempValueRef.current = [mergedValue?.[0], null]
      return
    }

    tempValueRef.current = [tempValueRef.current?.[0], date]

    if (tempValueRef.current?.[0] && djsDate.isBefore(tempValueRef.current?.[0])) {
      tempValueRef.current = [null, date]
      setMergedValue(tempValueRef.current)
    } else {
      tempValueRef.current = [tempValueRef.current?.[0], date]
      if (tempValueRef.current?.[0] && tempValueRef.current?.[1]) {
        setMergedValue(tempValueRef.current)
      }
    }
  }

  return (
    <Flex gap={10} align="center">
      <DatePicker
        value={mergedValue?.[0]}
        onChange={onFromDateChange}
        {...otherProps}
        {...startProps}
      />
      <IconSax name="arrow-right" size={22} />
      <DatePicker
        value={mergedValue?.[1]}
        onChange={onToDateChange}
        {...otherProps}
        {...endProps}
      />
    </Flex>
  )
}

export default Index

export const requiredValidator = (_: any, value: [DateValue, DateValue]) => {
  if (!value?.[0] || !value?.[1]) {
    return Promise.reject(new Error('required'))
  }
  return Promise.resolve()
}
