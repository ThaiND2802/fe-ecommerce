import { useMemo } from 'react'
import { Input } from 'antd'
import InventorySelector from 'src/components/InventorySelector'
import NumberRangePicker from 'src/components/NumberRangePicker'
import { ButtonFilter } from 'src/lib/components/Buttons'
import FilterPopover from 'src/lib/components/FilterPopover'
import useLocaleGroup from 'src/locales/useLocaleGroup'
import { formatDataToBase64String } from 'src/utils/string'
import { useStore } from '../../store'
import useTableColumns from '../ColumnSelect/hook'
import { EColumnKey } from '../Table/column'

const DataFilter = () => {
  const [t] = useLocaleGroup('inventoryLog')
  const { columns } = useTableColumns()
  const setSearchFields = useStore((state) => state.setSearchFields)

  const filterFields = useMemo(() => {
    const allFields = {
      [EColumnKey.Id]: { type: 'text' },
      [EColumnKey.InventoryId]: { type: 'inventory' },
      [EColumnKey.MovementType]: { type: 'numberRange' },
      [EColumnKey.Quantity]: { type: 'numberRange' },
      [EColumnKey.Balance]: { type: 'numberRange' },
      [EColumnKey.ReferenceId]: { type: 'text' },
      [EColumnKey.ReferenceType]: { type: 'text' },
      [EColumnKey.Notes]: { type: 'text' },
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
          case 'inventory':
            return {
              key,
              Element: <InventorySelector allowClear placeholder={`${t.text.input}`} />,
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
