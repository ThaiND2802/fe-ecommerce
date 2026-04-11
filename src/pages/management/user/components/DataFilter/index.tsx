import { useMemo } from 'react'
import { DatePicker, Input } from 'antd'
import { ButtonFilter } from 'src/lib/components/Buttons'
import BooleanStatusSelector from 'src/components/BooleanStatusSelector'
import FilterPopover from 'src/lib/components/FilterPopover'
import useLocaleGroup from 'src/locales/useLocaleGroup'
import { formatDataToBase64String } from 'src/utils/string'
import { useStore } from '../../store'
import useTableColumns from '../ColumnSelect/hook'
import { EColumnKey } from '../Table/column'

const DataFilter = () => {
  const [t] = useLocaleGroup('user')
  const { columns } = useTableColumns()
  const setSearchFields = useStore((state) => state.setSearchFields)

  const filterFields = useMemo(() => {
    const allFields = {
      [EColumnKey.Id]: { type: 'text' },
      [EColumnKey.FullName]: { type: 'text' },
      [EColumnKey.Email]: { type: 'text' },
      [EColumnKey.Phone]: { type: 'text' },
      [EColumnKey.Image]: { type: 'text' },
      [EColumnKey.Gender]: { type: 'text' },
      [EColumnKey.DateOfBirth]: { type: 'date' },
      [EColumnKey.Address]: { type: 'text' },
      [EColumnKey.DepartmentId]: { type: 'text' },
      [EColumnKey.PositionId]: { type: 'text' },
      [EColumnKey.JobTitleId]: { type: 'text' },
      [EColumnKey.AvatarUrl]: { type: 'text' },
      [EColumnKey.HireDate]: { type: 'date' },
      [EColumnKey.RefreshToken]: { type: 'text' },
      [EColumnKey.RefreshTokenExpiryTime]: { type: 'date' },
      [EColumnKey.IsActive]: { type: 'status' },
    } as const

    const fields = Object.entries(allFields)
      .map(([key, value]) => {
        switch (value.type) {
          case 'text':
            return {
              key,
              Element: <Input placeholder={`${t.text.input}`} />,
            }
          case 'date':
            return {
              key,
              Element: <DatePicker style={{ width: '100%' }} />,
            }
          case 'status':
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
