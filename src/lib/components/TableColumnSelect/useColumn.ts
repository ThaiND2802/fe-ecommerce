import { useMemo } from 'react'

import { TableColumnType } from '.'
import { useStore } from './store'

const useTableColumnsSelection = <T>(key: string, columns: TableColumnType<T>[]) => {
  const tableColumns = useStore((state) => state[key])

  const columnMap = useMemo(
    () =>
      columns.reduce(
        (acc, c) => {
          acc[c.key] = c
          return acc
        },
        {} as Record<keyof T, TableColumnType<T>>,
      ),
    [columns],
  )

  const storedColumnMap = useMemo(
    () =>
      tableColumns?.columns.reduce(
        (acc, c) => {
          acc[c.key] = c
          return acc
        },
        {} as Record<keyof T, TableColumnType<T>>,
      ),
    [tableColumns?.columns],
  )

  const isDifferent = useMemo(() => {
    let isDiff = false
    for (const key in columnMap) {
      if (!storedColumnMap?.[key]) {
        isDiff = true
        break
      }
    }
    for (const key in storedColumnMap) {
      if (!columnMap[key]) {
        isDiff = true
        break
      }
    }
    return isDiff
  }, [columnMap, storedColumnMap])

  const setColumns = (columns: TableColumnType<T>[]) => {
    useStore.setState({
      [key]: {
        columns,
      },
    })
  }

  return {
    columns: isDifferent
      ? columns
      : tableColumns?.columns.map((c) => ({ ...c, label: columnMap[c.key].label || c.label })),
    setColumns,
  }
}

export default useTableColumnsSelection
