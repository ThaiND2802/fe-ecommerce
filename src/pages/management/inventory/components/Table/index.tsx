import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Flex } from 'antd'
import Empty from 'src/lib/components/Empty'
import Table, { ColumnType } from 'src/lib/components/Table'
import Actions from 'src/lib/components/Table/actions'
import Ellipsis from 'src/lib/components/Ellipsis'
import { productQueries } from 'src/entities/management/product'
import useLocaleGroup from 'src/locales/useLocaleGroup'
import ActionMenu from '../ActionMenu'
import PopupDelete from '../PopupDelete'
import { EColumnKey } from './column'
import { ITableData, useTableData } from './hook'
import styles from './index.module.less'

const Index = () => {
  const [t] = useLocaleGroup('inventory')
  const { columns, datasource, tableParams, isLoading, handleTableChange } = useTableData()
  const { data: productList } = useQuery({
    ...productQueries.list({
      page_index: 0,
      page_size: 100,
    }),
  })

  const productMap = useMemo(() => {
    return (productList?.data || []).reduce<Record<string, string>>((acc, item) => {
      acc[item.id] = `${item.id} - ${item.name}`
      return acc
    }, {})
  }, [productList?.data])

  const columnMap = useMemo(() => {
    return {
      [EColumnKey.Id]: {
        dataIndex: EColumnKey.Id,
        width: 160,
        sorter: true,
      },
      [EColumnKey.ProductId]: {
        dataIndex: EColumnKey.ProductId,
        width: 220,
        sorter: true,
        render: (value: string) => productMap[value] || value,
      },
      [EColumnKey.Quantity]: {
        dataIndex: EColumnKey.Quantity,
        width: 140,
        sorter: true,
      },
      [EColumnKey.ReservedQuantity]: {
        dataIndex: EColumnKey.ReservedQuantity,
        width: 160,
        sorter: true,
      },
      [EColumnKey.AvailableQuantity]: {
        dataIndex: EColumnKey.AvailableQuantity,
        width: 160,
        sorter: true,
      },
      [EColumnKey.ReorderLevel]: {
        dataIndex: EColumnKey.ReorderLevel,
        width: 140,
        sorter: true,
      },
      [EColumnKey.LastUpdated]: {
        dataIndex: EColumnKey.LastUpdated,
        minWidth: 200,
        restWidth: true,
        sorter: true,
        render: (text: string) => <Ellipsis>{text}</Ellipsis>,
      },
    } as Partial<Record<EColumnKey, ColumnType<ITableData>>>
  }, [productMap])

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
            <ActionMenu id={record.id} title={record.id || ''} />
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
