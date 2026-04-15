import { useMemo } from 'react'
import { Input } from 'antd'

import { ButtonFilter } from 'src/lib/components/Buttons'
import OrderStatusSelector from 'src/components/OrderStatusSelector'
import OrderTypeSelector from 'src/components/OrderTypeSelector'
import DatePicker from 'src/lib/components/DatePicker'
import FilterPopover from 'src/lib/components/FilterPopover'

import useTableColumns from '../ColumnSelect/hook'
import { EColumnKey } from '../Table/column'
import useLocaleGroup from 'src/locales/useLocaleGroup'
import NumberRangePicker from 'src/components/NumberRangePicker'
import { formatDataToBase64String } from 'src/utils/string'
import { useStore } from '../../store'

const DataFilter = () => {
  const [t] = useLocaleGroup('order')
  const { columns } = useTableColumns()
  const setSearchFields = useStore((state) => state.setSearchFields)

  const filterFields = useMemo(() => {
    const allFields = {
      [EColumnKey.OrderCode]: { type: 'text' },
      [EColumnKey.CustomerId]: { type: 'text' },
      [EColumnKey.OrderDate]: { type: 'date' },
      [EColumnKey.DueDate]: { type: 'date' },
      [EColumnKey.OrderType]: { type: 'orderType' },
      [EColumnKey.DeliveryAddress]: { type: 'text' },
      [EColumnKey.VatRate]: { type: 'numberRange' },
      [EColumnKey.VatAmount]: { type: 'numberRange' },
      [EColumnKey.TotalAmount]: { type: 'numberRange' },
      [EColumnKey.TotalAmountWithVat]: { type: 'numberRange' },
      [EColumnKey.AmountPaid]: { type: 'numberRange' },
      [EColumnKey.DebtAmount]: { type: 'numberRange' },
      [EColumnKey.PaymentMethod]: { type: 'text' },
      [EColumnKey.Status]: { type: 'status' },
      [EColumnKey.Note]: { type: 'text' },
    } as const

    const fields = Object.entries(allFields)
      .map(([key, value]) => {
        switch (value.type) {
          case 'text':
            return {
              key,
              Element: <Input placeholder={`${t.text.input}`} />,
            }
          case 'numberRange':
            return {
              key,
              Element: <NumberRangePicker placeholder={`${t.text.input}`} />,
            }
          case 'date':
            return {
              key,
              Element: <DatePicker stringValue style={{ width: '100%' }} />,
            }
          case 'orderType':
            return {
              key,
              Element: <OrderTypeSelector allowClear placeholder={`${t.text.input}`} />,
            }
          case 'status':
            return {
              key,
              Element: <OrderStatusSelector allowClear placeholder={`${t.text.input}`} />,
            }
        }
      })
      .reduce<Record<string, { key: string; Element: React.ReactNode }>>((acc, curr) => {
        acc[curr.key] = curr
        return acc
      }, {})

    return fields
  }, [t.text.input])

  const handleApply = (data: any) => {
    setSearchFields(formatDataToBase64String({ ...data }))
  }

  return (
    <FilterPopover onApply={handleApply} fields={filterFields} runtimeFields={columns}>
      {({ count }) => <ButtonFilter count={count} />}
    </FilterPopover>
  )
}

export default DataFilter
