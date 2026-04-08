import { DatePicker as AntdDatePicker, DatePickerProps } from 'antd'
import dayjs, { Dayjs } from 'dayjs'

import useLocale from '../../locales/useLocale'
import styles from './index.module.less'

export interface IProps extends Omit<DatePickerProps, 'onChange' | 'value'> {
  stringValue?: boolean
  value?: string | Dayjs
  startOfDay?: boolean
  endOfDay?: boolean
  disablePast?: boolean
  disableFuture?: boolean
  onChange?: (value: string | Dayjs, date: string | Dayjs) => void
}

const DatePicker = ({
  stringValue,
  onChange,
  value,
  startOfDay,
  endOfDay,
  disablePast,
  disableFuture,
  ...otherProps
}: IProps) => {
  let myValue = value
  if (stringValue && value) myValue = dayjs(value)
  const [t] = useLocale('setting')

  const myOnchange = (date: Dayjs, dateString: string) => {
    let processedDate = startOfDay ? date.startOf('day') : date
    if (endOfDay) processedDate = processedDate.endOf('day')

    if (onChange) {
      if (stringValue) {
        onChange(processedDate?.toISOString() || null, processedDate)
      } else {
        onChange(processedDate, processedDate?.toISOString() || null)
      }
    }
  }

  return (
    <AntdDatePicker
      classNames={{
        popup: {
          root: styles.popup,
        },
      }}
      format={otherProps.showTime ? t.dateTimeFormat : t.dateFormat}
      disabledDate={(current) =>
        (disablePast && current.isBefore(dayjs().startOf('day'))) ||
        (disableFuture && current.isAfter(dayjs().endOf('day')))
      }
      {...otherProps}
      value={myValue}
      onChange={myOnchange}
    />
  )
}

type RangePickerProps = React.ComponentProps<typeof AntdDatePicker.RangePicker>
export interface IRangePickerProps extends Omit<RangePickerProps, 'value' | 'onChange'> {
  stringValue?: boolean
  value?: [string, string] | [Dayjs, Dayjs]
  onChange?: (
    value: [string, string] | [Dayjs, Dayjs],
    date: [string, string] | [Dayjs, Dayjs],
  ) => void
}

const RangePicker = ({ value, stringValue, onChange, ...otherProps }: IRangePickerProps) => {
  let myValue = value
  if (stringValue && value) myValue = [dayjs(value[0]), dayjs(value[1])]
  const [t] = useLocale('setting')

  const myOnchange = (date: [Dayjs, Dayjs], dateString: [string, string]) => {
    if (onChange) {
      if (stringValue) {
        onChange([date?.[0]?.toISOString(), date?.[1]?.toISOString()], date)
      } else {
        onChange(date, dateString)
      }
    }
  }

  return (
    <AntdDatePicker.RangePicker
      classNames={{
        popup: {
          root: styles.popup,
        },
      }}
      value={myValue as [Dayjs, Dayjs]}
      onChange={myOnchange}
      format={otherProps.showTime ? t.dateTimeFormat : t.dateFormat}
      {...otherProps}
    />
  )
}

DatePicker.RangePicker = RangePicker

export default DatePicker
