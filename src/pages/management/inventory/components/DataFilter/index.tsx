import { useMemo } from 'react'
import { DatePicker, Input } from 'antd'
import NumberRangePicker from 'src/components/NumberRangePicker'
import ProductSelector from 'src/components/ProductSelector'
import { ButtonFilter } from 'src/lib/components/Buttons'
import FilterPopover from 'src/lib/components/FilterPopover'
import useLocaleGroup from 'src/locales/useLocaleGroup'
import { formatDataToBase64String } from 'src/utils/string'
import { useStore } from '../../store'
import useTableColumns from '../ColumnSelect/hook'
import { EColumnKey } from '../Table/column'

const DataFilter = () => {
  const [t] = useLocaleGroup('inventory')
  const { columns } = useTableColumns()
  const setSearchFields = useStore((state) => state.setSearchFields)

  const filterFields = useMemo(() => {
    const allFields = {
      [EColumnKey.Id]: { type: 'text' },
      [EColumnKey.ProductId]: { type: 'product' },
      [EColumnKey.Quantity]: { type: 'numberRange' },
      [EColumnKey.ReservedQuantity]: { type: 'numberRange' },
      [EColumnKey.AvailableQuantity]: { type: 'numberRange' },
      [EColumnKey.ReorderLevel]: { type: 'numberRange' },
      [EColumnKey.LastUpdated]: { type: 'date' },
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
          case 'product':
            return {
              key,
              Element: <ProductSelector allowClear placeholder={`${t.text.input}`} />,
            }
          case 'date':
            return {
              key,
              Element: <DatePicker style={{ width: '100%' }} placeholder={`${t.text.input}`} />,
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
