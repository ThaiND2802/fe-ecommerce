import React, { useEffect, useMemo, useRef, useState } from 'react'
import type { FormInstance } from 'antd'
import { Flex, Form, Space, Table as AntdTable, theme, Button, Tag } from 'antd'
import type { Rule } from 'antd/es/form'
import type { ColumnType as AntColumnType, TableProps } from 'antd/es/table'
import classNames from 'classnames'

import IconSax from 'src/lib/components/IconSax'
import { useDebounceFn, useEffectFromSecond } from 'src/lib/hooks'
import useLocale from 'src/lib/locales/useLocale'

import EditableCell from './cell'
import EditableRow from './row'
import styles from './index.module.less'

interface IEditingCell<T> {
  Component: React.ReactNode | ((formValues: T, record: T) => React.ReactNode)
  rules?: Rule[]
  validateTrigger?: string
  dependencies?: any[]
  valuePropName?: string
  onValueChange?: (value: any, form: FormInstance<T>) => void
}

type FilterValueRender = (value: any) => React.ReactNode

interface IFilter<T> {
  Component: React.ReactNode
  suffix?: string
  render?: FilterValueRender
}

export interface ColumnType<T> extends AntColumnType<T> {
  editable?: IEditingCell<T>
  filter?: IFilter<T>
  verticalAlign?: 'top' | 'middle' | 'bottom'
  dataIndex?: Extract<keyof T, string | number>
  restWidth?: boolean
}

export interface ITableProps<T> extends TableProps<T> {
  columns: ColumnType<T>[]
  dataSource: T[]
  actions?: React.ReactNode[]
  selectedRowActions?: React.ReactNode[]
  editingRows?: {
    [key: string]: boolean
  }
  tooltipError?: boolean
  showTotal?: boolean
  autoScrollY?: boolean
  adaptiveHeight?: boolean
  wrapperClassName?: string
  deafaultColumnWidth?: number
  autoHideSelectionBox?: boolean
  paginationPadding?: boolean
  hasActionMenu?: boolean
  rowEditable?: (record: T) => boolean
  onRowFormCreated?: (form: FormInstance<T>, record: T) => void
  onEditingRow?: (record: T) => void
  onValueChange?: (
    record: T,
    changedValue: Partial<T>,
    allValues: Partial<T>,
    form: FormInstance<T>,
  ) => void
  onFilterChange?: (values: { [key: string]: any }) => void
}

const Table = <T,>({
  columns,
  dataSource,
  actions,
  selectedRowActions,
  rowKey = 'id',
  editingRows,
  tooltipError,
  showTotal,
  autoScrollY = true,
  adaptiveHeight = true,
  wrapperClassName,
  className,
  deafaultColumnWidth = 300,
  bordered,
  autoHideSelectionBox,
  paginationPadding,
  hasActionMenu,
  onRow,
  rowEditable,
  onValueChange,
  onRowFormCreated,
  onEditingRow,
  onFilterChange,
  ...props
}: ITableProps<T>): React.ReactElement => {
  const [editingCells] = useState<{
    [key: string]: {
      [key: string]: boolean
    }
  }>({})
  const [filterVisible, setFilterVisible] = useState<boolean>(false)
  const [filterForm] = Form.useForm()
  const [filterValues, setFilterValues] = useState({})
  const columnsRef = useRef<{ [key: string]: ColumnType<T> }>({})
  const [t, tran] = useLocale('Table')
  const { token } = theme.useToken()
  const hasFilter = useMemo(() => {
    return columns.filter(({ filter }) => !!filter).length
  }, [columns])

  useEffect(() => {
    columns.forEach((col) => {
      columnsRef.current[(col.dataIndex || col.key) as string] = col
    })
  }, [columns])

  useEffectFromSecond(() => {
    fireFilterOnChange()
  }, [filterValues])

  const fireFilterOnChange = useDebounceFn(() => {
    if (onFilterChange) {
      onFilterChange(filterValues)
    }
  }, 500)

  const editableColumns = columns.map((col) => {
    const colWithWidth = {
      ...col,
      ...(col.width === undefined
        ? {
          width: col.restWidth ? undefined : deafaultColumnWidth,
        }
        : { width: col.width }),
    }
    if (col.editable) {
      return {
        ...colWithWidth,
        onCell: (record: T) => ({
          ...col.editable,
          record,
          title: col.title as string,
          editable: true,
          dataIndex: col.dataIndex,
          isNewRow: Number(record[rowKey as keyof T]) < 0,
          rowId: record[rowKey as keyof T],
          editingCells,
          editingRows,
          tooltipError,
          toggleEditCell,
          rowEditable,
          ...(col.verticalAlign ? { style: { verticalAlign: col.verticalAlign } } : {}),
          ...col.onCell,
        }),
      }
    }
    return colWithWidth
  })

  const onRowChange = (
    record: T,
    changedValue: Partial<T>,
    allValues: Partial<T>,
    form: FormInstance<T>,
  ) => {
    if (onValueChange) {
      onValueChange(record, changedValue, allValues, form)
    }
  }

  const onFilterFormChange = (_formName: string, data) => {
    const { changedFields } = data
    if (changedFields.length) {
      const [{ name, value }] = changedFields
      setFilterValues({
        ...filterValues,
        [name[0]]: value,
      })
    }
  }

  const resetFilter = () => {
    filterForm.resetFields()
    setFilterValues({})
  }

  const toggleEditCell = (rowId: string, field: string, record: T) => {
    toggleEditingRow(record)
  }

  const toggleEditingRow = (record: T) => {
    if (onEditingRow) {
      onEditingRow(record)
    }
  }

  const scrollX = () => {
    return columns.reduce((acc, col) => {
      if (col.width === undefined) {
        return acc + (col.minWidth || deafaultColumnWidth)
      }
      return acc + (Number(col.width) || 0)
    }, 0)
  }

  const filterCol: ColumnType<T> = {
    title: (
      <Button
        size="small"
        type="text"
        style={{ height: 20 }}
        onClick={() => {
          setFilterVisible(!filterVisible)
        }}>
        <IconSax
          name="filter-search"
          size={16}
          {...(filterVisible ? { color: token.colorPrimary } : {})}
        />
      </Button>
    ),
    fixed: 'right',
    width: 40,
  }

  const renderActions = () => {
    return actions?.length || selectedRowActions?.length ? (
      <Flex className={styles.actions}>
        {!!selectedRowActions?.length && (
          <Space style={{ flex: 1 }}>{selectedRowActions.map((comp) => comp)}</Space>
        )}
        {!!actions?.length && <Space>{actions.map((comp) => comp)}</Space>}
      </Flex>
    ) : null
  }

  const renderFilter = () =>
    filterVisible ? (
      <AntdTable.Summary fixed="top">
        <Form.Provider onFormChange={onFilterFormChange}>
          <AntdTable.Summary.Row>
            {columns.map((col, idx) => (
              <AntdTable.Summary.Cell key={col.key || (col.dataIndex as string)} index={idx}>
                {col.filter ? (
                  <Form form={filterForm} name="filterForm">
                    <Form.Item name={(col.dataIndex as string) || (col.key as string)}>
                      {col.filter.Component}
                    </Form.Item>
                  </Form>
                ) : null}
              </AntdTable.Summary.Cell>
            ))}
          </AntdTable.Summary.Row>
        </Form.Provider>
      </AntdTable.Summary>
    ) : null

  const renderFilterValue = (
    field: string,
    label: string,
    value: any,
    render: FilterValueRender,
  ) => {
    const valueToRender = render(value)
    return valueToRender ? (
      <Tag
        className={styles.filterTag}
        key={field}
        closable
        onClose={(e) => {
          filterForm.resetFields([field])
          setFilterValues({
            ...filterValues,
            [field]: '',
          })
        }}
        icon={<IconSax name="search-normal-1" size={14} />}>
        {label}: {valueToRender}
      </Tag>
    ) : null
  }

  const renderFilterBar = () => {
    const filters = Object.keys(filterValues).map((key) => ({
      field: key,
      value: filterValues[key],
      label: columnsRef.current[key].title as string,
      suffix: columnsRef.current[key].filter?.suffix,
      render: columnsRef.current[key].filter?.render || ((value) => value),
    }))

    const filtersToRender = filters.filter(({ value }) => {
      if (Array.isArray(value)) {
        return !!value.length
      }
      return !!value
    })

    if (filtersToRender.length) {
      return (
        <Flex className={styles.filter}>
          <Space style={{ flex: 1, flexWrap: 'wrap', marginRight: 8 }}>
            {filtersToRender.map(({ field, label, value, render }) =>
              renderFilterValue(field, label, value, render),
            )}
          </Space>
          <Button onClick={resetFilter}>{t.button.clear}</Button>
        </Flex>
      )
    }

    return null
  }

  return (
    <Flex
      className={classNames(wrapperClassName, styles.tableWrapper, {
        [styles.tableFullHeight]: autoScrollY,
        [styles.tableAdaptiveHeight]: adaptiveHeight,
        [styles.tableBordered]: bordered,
        [styles.tableNoPagination]:
          !props.pagination ||
          (props.pagination?.hideOnSinglePage && dataSource?.length <= props.pagination?.pageSize),
        [styles.tableAutoHideSelectionBox]: autoHideSelectionBox,
        [styles.tablePaginationPadding]: paginationPadding,
        [styles.loading]: props.loading,
        [styles.tableHasActionMenu]: hasActionMenu,
      })}
      vertical>
      {renderFilterBar()}
      {renderActions()}
      <div className={styles.tableOuter}>
        <AntdTable<T>
          className={classNames(styles.table, className)}
          size="small"
          components={{
            body: {
              row: EditableRow,
              cell: EditableCell,
            },
          }}
          scroll={{
            x: scrollX(),
            ...(autoScrollY
              ? {
                y: 300,
              }
              : {}),
          }}
          dataSource={dataSource}
          columns={[...editableColumns, ...(hasFilter ? [filterCol] : [])]}
          rowKey={rowKey}
          onRow={(record, index) => ({
            record,
            title: '',
            hiddenFields: editableColumns
              .filter(({ hidden }) => hidden)
              .map(({ dataIndex, key }) => dataIndex || key),
            onRowChange,
            onRowFormCreated,
            ...onRow?.(record, index),
            className:
              dataSource.length - 1 === index
                ? `${onRow?.(record, index)?.className || ''} last-row`
                : onRow?.(record, index)?.className,
          })}
          summary={renderFilter}
          {...props}
          {...(showTotal && props.pagination !== false
            ? {
              pagination: {
                ...(props.pagination),
                showTotal: (total, range) =>
                  tran(t.pagination.showTotal, {
                    total,
                    from: range[0],
                    to: range[1],
                  }),
              },
            }
            : {})}
        />
      </div>
    </Flex>
  )
}

export default Table
