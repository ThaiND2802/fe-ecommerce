import { useMemo } from 'react'
import { Input } from 'antd'

import { ButtonFilter } from 'src/lib/components/Buttons'
import BooleanStatusSelector from 'src/components/BooleanStatusSelector'
import CategorySelector from 'src/components/CategorySelector'
import FilterPopover from 'src/lib/components/FilterPopover'
import useLocaleGroup from 'src/locales/useLocaleGroup'
import NumberRangePicker from 'src/components/NumberRangePicker'
import { formatDataToBase64String } from 'src/utils/string'
import { useStore } from '../../store'
import useTableColumns from '../ColumnSelect/hook'
import { EColumnKey } from '../Table/column'

const DataFilter = () => {
  const [t] = useLocaleGroup('product')
  const { columns } = useTableColumns()
  const setSearchFields = useStore((state) => state.setSearchFields)

  const filterFields = useMemo(() => {
    const allFields = {
      [EColumnKey.Id]: { type: 'text' },
      [EColumnKey.Code]: { type: 'text' },
      [EColumnKey.Name]: { type: 'text' },
      [EColumnKey.Description]: { type: 'text' },
      [EColumnKey.Unit]: { type: 'text' },
      [EColumnKey.Price]: { type: 'numberRange' },
      [EColumnKey.CostPrice]: { type: 'numberRange' },
      [EColumnKey.ImageUrl]: { type: 'text' },
      [EColumnKey.CategoryId]: { type: 'category' },
      [EColumnKey.IsActive]: { type: 'boolean' },
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
          case 'category':
            return {
              key,
              Element: <CategorySelector allowClear placeholder={`${t.text.input}`} />,
            }
          case 'boolean':
            return {
              key,
              Element: <BooleanStatusSelector allowClear placeholder={`${t.text.input}`} />,
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
