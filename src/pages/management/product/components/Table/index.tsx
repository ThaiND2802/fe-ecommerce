import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Flex } from 'antd'
import Empty from 'src/lib/components/Empty'
import Ellipsis from 'src/lib/components/Ellipsis'
import Tag from 'src/lib/components/Tag'
import Table, { ColumnType } from 'src/lib/components/Table'
import Actions from 'src/lib/components/Table/actions'
import { categoryQueries } from 'src/entities/management/category/queries'
import useLocaleGroup from 'src/locales/useLocaleGroup'
import ActionMenu from '../ActionMenu'
import PopupDelete from '../PopupDelete'
import { EColumnKey } from './column'
import { ITableData, useTableData } from './hook'
import styles from './index.module.less'

const Index = () => {
  const [t] = useLocaleGroup('product')
  const { columns, datasource, tableParams, isLoading, handleTableChange } = useTableData()
  const { data: categoryList } = useQuery({
    ...categoryQueries.list({
      page_index: 0,
      page_size: 100,
    }),
  })

  const categoryMap = useMemo(() => {
    return (categoryList?.data || []).reduce<Record<string, string>>((acc, item) => {
      acc[item.id] = `${item.id} - ${item.name}`
      return acc
    }, {})
  }, [categoryList?.data])

  const columnMap = useMemo(() => {
    return {
      [EColumnKey.Id]: {
        dataIndex: EColumnKey.Id,
        width: 140,
        sorter: true,
      },
      [EColumnKey.Code]: {
        dataIndex: EColumnKey.Code,
        width: 140,
        sorter: true,
      },
      [EColumnKey.Name]: {
        dataIndex: EColumnKey.Name,
        width: 200,
        sorter: true,
      },
      [EColumnKey.Description]: {
        dataIndex: EColumnKey.Description,
        minWidth: 240,
        restWidth: true,
        sorter: true,
        render: (text: string) => <Ellipsis line={2}>{text}</Ellipsis>,
      },
      [EColumnKey.Unit]: {
        dataIndex: EColumnKey.Unit,
        width: 120,
        sorter: true,
      },
      [EColumnKey.Price]: {
        dataIndex: EColumnKey.Price,
        width: 140,
        sorter: true,
      },
      [EColumnKey.CostPrice]: {
        dataIndex: EColumnKey.CostPrice,
        width: 140,
        sorter: true,
      },
      [EColumnKey.ImageUrl]: {
        dataIndex: EColumnKey.ImageUrl,
        width: 220,
        sorter: true,
        render: (text: string) => <Ellipsis>{text}</Ellipsis>,
      },
      [EColumnKey.CategoryId]: {
        dataIndex: EColumnKey.CategoryId,
        width: 160,
        sorter: true,
        render: (value: string) => categoryMap[value] || value,
      },
      [EColumnKey.IsActive]: {
        dataIndex: EColumnKey.IsActive,
        width: 120,
        sorter: true,
        render: (value: boolean) => (
          <Tag color={value ? 'green' : 'light-gray'}>
            {value ? t.boolean.active : t.boolean.inactive}
          </Tag>
        ),
      },
    } as Partial<Record<EColumnKey, ColumnType<ITableData>>>
  }, [categoryMap, t.boolean.active, t.boolean.inactive])

  const columnsToRender = useMemo(() => {
    return [
      {
        title: t.table.columns.no,
        width: 60,
        render: (_text, _record, index) => {
          return index + 1 + (tableParams.pagination.current - 1) * tableParams.pagination.pageSize
        },
      },
      ...columns
        .filter(({ isActive, isMandatory }) => isActive || isMandatory)
        .map((column) => ({
          ...columnMap[column.key],
          title: column.label,
        })),
      {
        key: 'action',
        width: 1,
        fixed: 'right',
        render: (_text: string, record: ITableData) => (
          <Actions>
            <ActionMenu id={record.id} title={record.name || ''} />
          </Actions>
        ),
      },
    ]
  }, [columnMap, columns, tableParams.pagination, t.table.columns.no])

  return (
    <Flex vertical className={styles.container}>
      <Table
        wrapperClassName={styles.tableWrapper}
        columns={columnsToRender}
        dataSource={datasource}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
        deafaultColumnWidth={150}
        loading={isLoading}
        showTotal
        bordered
        locale={{
          emptyText: <Empty />,
        }}
      />
      <PopupDelete />
    </Flex>
  )
}

export default Index
