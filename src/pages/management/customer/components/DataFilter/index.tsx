import { useMemo } from 'react'
import { Input } from 'antd'

import { ButtonFilter } from 'src/lib/components/Buttons'
import FilterPopover from 'src/lib/components/FilterPopover'

import useTableColumns from '../ColumnSelect/hook'
import { EColumnKey } from '../Table/column'
import useLocaleGroup from 'src/locales/useLocaleGroup'
import NumberRangePicker from 'src/components/NumberRangePicker'
import { formatDataToBase64String } from 'src/utils/string'
import { useStore } from '../../store'

const DataFilter = () => {
  const [t] = useLocaleGroup('customer')
  const { columns } = useTableColumns()

  const setSearchFields = useStore((state) => state.setSearchFields)

  const filterFields = useMemo(() => {
    const allFields = {
      [EColumnKey.Code]: {
        type: 'text',
      },
      [EColumnKey.Name]: {
        type: 'text',
      },
      [EColumnKey.Email]: {
        type: 'text',
      },
      [EColumnKey.Phone]: {
        type: 'text',
      },
      [EColumnKey.Address]: {
        type: 'text',
      },
      [EColumnKey.TaxCode]: {
        type: 'text',
      },
      [EColumnKey.ContactPerson]: {
        type: 'text',
      },
      [EColumnKey.CreditLimit]: {
        type: 'numberRange',
      },
      [EColumnKey.CurrentDebt]: {
        type: 'numberRange',
      },
      [EColumnKey.CustomerType]: {
        type: 'text',
      },
    }

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
        }
      })
      .reduce((acc, curr) => {
        acc[curr.key] = curr
        return acc
      }, {})

    return fields
  }, [])

  const handleApply = (data: any) => {
    const formattedData = {
      ...data,
    }
    setSearchFields(formatDataToBase64String(formattedData))
  }

  return (
    <FilterPopover onApply={handleApply} fields={filterFields} runtimeFields={columns}>
      {({ count }) => <ButtonFilter count={count} />}
    </FilterPopover>
  )
}

export default DataFilter
