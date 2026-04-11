import { useMemo } from 'react'
import { Input } from 'antd'
import { ButtonFilter } from 'src/lib/components/Buttons'
import FilterPopover from 'src/lib/components/FilterPopover'
import useLocaleGroup from 'src/locales/useLocaleGroup'
import { formatDataToBase64String } from 'src/utils/string'
import { useStore } from '../../store'
import useTableColumns from '../ColumnSelect/hook'
import { EColumnKey } from '../Table/column'

const DataFilter = () => {
  const [t] = useLocaleGroup('tenant')
  const { columns } = useTableColumns()
  const setSearchFields = useStore((state) => state.setSearchFields)

  const filterFields = useMemo(() => {
    const allFields = {
      [EColumnKey.Id]: { type: 'text' },
      [EColumnKey.Name]: { type: 'text' },
      [EColumnKey.Schema]: { type: 'text' },
    } as const

    const fields = Object.entries(allFields)
      .map(([key]) => ({
        key,
        Element: <Input placeholder={`${t.text.input}`} />,
      }))
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
