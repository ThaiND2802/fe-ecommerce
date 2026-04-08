import type { GetProp, TableProps } from 'antd'
import type { SorterResult } from 'antd/es/table/interface'
import { FormInstance } from 'antd/lib'
import React, { useCallback, useRef, useState } from 'react'

type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>

interface IUseTable {
  tableParams?: {
    pagination: TablePaginationConfig
  }
  keyDataIndex?: string
}

interface TableParams {
  pagination?: TablePaginationConfig
  sortField?: SorterResult<any>['field']
  sortOrder?: SorterResult<any>['order']
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1]
}

const useTable = <T extends { [key: string]: any }>(
  { tableParams: tParams = { pagination: {} }, keyDataIndex = 'id' }: IUseTable = {},
  dependency?: any[],
) => {
  const [datasource, setDatasource] = useState<T[]>([])
  const [loadingState, setLoadingState] = useState<boolean>(false)
  const [tableParams, setTableParams] = useState<TableParams>({
    ...tParams,
    pagination: {
      current: 1,
      pageSize: 50,
      total: 0,
      showSizeChanger: true,
      size: 'default',
      position: ['bottomCenter'],
      ...tParams.pagination,
    },
  })
  const [newRowIndex, setNewRowIndex] = useState<number>(-1)
  const [editingAndNewRows, setEditingAndNewRows] = useState<Partial<T>[]>([])
  const [editingRows, setEditingRows] = useState<{ [key: number]: boolean }>({})
  const [selectingRows, setSelectingRows] = useState<T[]>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const formsRef = useRef<{ [key: typeof keyDataIndex]: FormInstance<T> }>({})
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([])

  const setLoading = useCallback((status: boolean) => {
    setLoadingState(status)
  }, [])

  const handleTableChange: TableProps<T>['onChange'] = useCallback(
    (pagination, filters, sorter: SorterResult<T>, extra) => {
      setTableParams({
        pagination,
        sortField: sorter.field,
        sortOrder: sorter.order,
        // filters,
      })
    },
    [],
  )

  const updateNewRowIndex = useCallback(() => {
    setNewRowIndex(newRowIndex - 1)
  }, [newRowIndex])

  const onValueChange = useCallback(
    (row: T, changedValue: Partial<T>, allValues: Partial<T>, form: FormInstance) => {
      const rowIndex = editingAndNewRows.findIndex(
        (record) =>
          record[keyDataIndex as keyof Partial<T>] === row[keyDataIndex as keyof Partial<T>],
      )
      if (rowIndex === -1) {
        setEditingAndNewRows([
          {
            [keyDataIndex as keyof Partial<T>]: row[keyDataIndex as keyof Partial<T>],
            ...allValues,
          },
          ...editingAndNewRows,
        ])
      } else {
        const editingRow = { ...editingAndNewRows[rowIndex], ...allValues }
        editingAndNewRows.splice(rowIndex, 1)
        setEditingAndNewRows([editingRow, ...editingAndNewRows])
      }
    },
    [editingAndNewRows, ...(dependency || [])],
  )

  const updateFormsRef = (form: FormInstance<T>, record: T) => {
    formsRef.current[record[keyDataIndex]] = form
  }

  const validateForms = (onSuccess: () => void, onFailed?: () => void) => {
    const formsToValidate = Object.keys(formsRef.current)
      .map((id) => {
        const form = formsRef.current[id]
        if (
          Number(id) < 0 ||
          editingAndNewRows.some((record) => record[keyDataIndex] === Number(id))
        ) {
          return form
        }
        return undefined
      })
      .filter((f: any) => f !== undefined)

    Promise.all(formsToValidate.map((form) => form?.validateFields()))
      .then(() => {
        onSuccess()
      })
      .catch((error) => {
        onFailed?.()
      })
  }

  const validateEdditingForms = (onSuccess: () => void, onFailed?: () => void) => {
    const formsToValidate = editingAndNewRows.map(
      (record) => formsRef.current[record[keyDataIndex]],
    )

    Promise.all(formsToValidate.map((form) => form?.validateFields()))
      .then(() => {
        onSuccess()
      })
      .catch((error) => {
        onFailed?.()
      })
  }

  const validateAllForms = (onSuccess?: (data: Partial<T>[]) => void, onFailed?: () => void) => {
    const formsToValidate = Object.keys(formsRef.current)
      .map((id) => formsRef.current[id])
      .filter((f: any) => f !== undefined)

    Promise.all(formsToValidate.map((form) => form?.validateFields()))
      .then(() => {
        if (onSuccess) {
          onSuccess(formsToValidate.map((form) => form.getFieldsValue()))
        }
      })
      .catch((error) => {
        onFailed?.()
      })
  }

  const handleDelete = (apiDelete: (rowsToDelete: T[]) => void) => {
    const rowsToDelete = selectingRows.filter((record) => record[keyDataIndex] > 0)

    if (rowsToDelete.length) {
      apiDelete(rowsToDelete)
    } else {
      const currentEditingRows = editingRows
      const localRows = selectingRows
        .filter((record) => {
          delete currentEditingRows[record[keyDataIndex]]
          return record[keyDataIndex] < 0
        })
        .map((record) => record[keyDataIndex])

      if (localRows.length) {
        setDatasource(datasource.filter((record) => !localRows.includes(record[keyDataIndex])))
        setEditingRows(currentEditingRows)
        setSelectingRows([])
      }
    }
  }

  const clearAll = () => {
    setEditingRows({})
    setSelectingRows([])
    setSelectedRowKeys([])
    setEditingAndNewRows([])
  }

  const addNewRow = (newRowData: Partial<T>) => {
    setDatasource([...datasource, newRowData as T])
    setEditingRows({
      ...editingRows,
      [newRowIndex]: true,
    })
    updateNewRowIndex()
  }

  const updateEditingValues = (data: Partial<T>) => {
    const newEditingData = [...editingAndNewRows]
    const rowToEdit = newEditingData.find((row) => row[keyDataIndex] === data[keyDataIndex])
    if (rowToEdit) {
      Object.keys(data).forEach((key) => {
        rowToEdit[key as keyof Partial<T>] = data[key]
      })
      setEditingAndNewRows(newEditingData)
    }
  }

  const setDatasourceGroupBy = (
    datasource: T[],
    groupBy: string,
    format?: (key: string) => string,
  ) => {
    if (!datasource?.length) {
      return
    }
    const result = datasource.reduce(
      (acc, curr) => {
        const key = format ? format(curr[groupBy as keyof T]) : curr[groupBy as keyof T]
        acc[key] = [...(acc[key] || []), curr]
        return acc
      },
      {} as { [key: string]: T[] },
    )

    const sortedResult = []
    Object.keys(result)
      .sort((a: string, b: string) => {
        return a.localeCompare(b)
      })
      .forEach((key) => {
        sortedResult.push({
          id: `group-${key}`,
          isGroup: true,
          groupValue: key,
        })
        result[key].forEach((item) => {
          sortedResult.push(item)
        })
      })

    setDatasource(sortedResult)
  }

  return {
    datasource,
    setDatasource,
    setDatasourceGroupBy,
    loading: loadingState,
    setLoading,
    handleTableChange,
    tableParams,
    setTableParams,
    newRowIndex,
    updateNewRowIndex,
    editingAndNewRows,
    setEditingAndNewRows,
    editingRows,
    setEditingRows,
    selectingRows,
    setSelectingRows,
    selectedRowKeys,
    setSelectedRowKeys,
    formsRef,
    updateFormsRef,
    validateForms,
    validateEdditingForms,
    validateAllForms,
    handleDelete,
    clearAll,
    addNewRow,
    updateEditingValues,
    expandedRowKeys,
    setExpandedRowKeys,
    onValueChange,
  }
}

export default useTable
