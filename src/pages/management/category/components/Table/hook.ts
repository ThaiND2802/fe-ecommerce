import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { CategoryItem, categoryQueries } from 'src/entities/management/category'
import useTable from 'src/lib/components/Table/useTable'
import emitter, { EVENTS } from '../../action'
import { useStore } from '../../store'
import useColumnSelect from '../ColumnSelect/hook'

export type ITableData = CategoryItem

export const useTableData = () => {
  const { datasource, tableParams, handleTableChange, setDatasource, setTableParams } =
    useTable<ITableData>()

  const searchValue = useStore((state) => state.searchValue)
  const searchFields = useStore((state) => state.searchFields)
  const setId = useStore((state) => state.setId)
  const toggleFormVisible = useStore((state) => state.toggleFormVisible)
  const { columns } = useColumnSelect()

  const { data: categoryList, isLoading, refetch } = useQuery({
    ...categoryQueries.list({
      filter: searchValue || undefined,
      search_fields: searchFields || undefined,
      sort_field: tableParams.sortField as string,
      is_descending: tableParams.sortOrder === 'descend',
      page_index: tableParams.pagination.current - 1,
      page_size: tableParams.pagination.pageSize,
    }),
  })

  const handleEdit = ({ id }: { id: string }) => {
    setId(id)
    toggleFormVisible()
  }

  useEffect(() => {
    if (categoryList) {
      setDatasource(categoryList.data)
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: categoryList.pagination?.total_rows,
        },
      })
    }
  }, [categoryList])

  useEffect(() => {
    emitter.on(EVENTS.REFRESH_TABLE, refetch)
    emitter.on(EVENTS.UPDATE, handleEdit)

    return () => {
      emitter.off(EVENTS.REFRESH_TABLE)
      emitter.off(EVENTS.UPDATE)
    }
  }, [])

  return { columns, datasource, tableParams, isLoading, handleTableChange, handleEdit }
}
