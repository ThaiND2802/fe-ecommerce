import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Flex } from 'antd'
import Empty from 'src/lib/components/Empty'
import Table, { ColumnType } from 'src/lib/components/Table'
import Actions from 'src/lib/components/Table/actions'
import { orderQueries } from 'src/entities/management/order'
import { productQueries } from 'src/entities/management/product'
import useLocaleGroup from 'src/locales/useLocaleGroup'
import ActionMenu from '../ActionMenu'
import PopupDelete from '../PopupDelete'
import { EColumnKey } from './column'
import { ITableData, useTableData } from './hook'
import styles from './index.module.less'

const Index = () => {
  const [t] = useLocaleGroup('orderItem')
  const { columns, datasource, tableParams, isLoading, handleTableChange } = useTableData()
  const { data: orderList } = useQuery({
    ...orderQueries.list({
      page_index: 0,
      page_size: 100,
    }),
  })
  const { data: productList } = useQuery({
    ...productQueries.list({
      page_index: 0,
      page_size: 100,
    }),
  })

  const orderMap = useMemo(() => {
    return (orderList?.data || []).reduce<Record<string, string>>((acc, item) => {
      acc[item.id] = item.order_code
      return acc
    }, {})
  }, [orderList?.data])

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
      [EColumnKey.OrderId]: {
        dataIndex: EColumnKey.OrderId,
        width: 180,
        sorter: true,
        render: (value: string) => orderMap[value] || value,
      },
      [EColumnKey.ProductId]: {
        dataIndex: EColumnKey.ProductId,
        width: 220,
        sorter: true,
        render: (value: string) => productMap[value] || value,
      },
      [EColumnKey.Coefficient0]: {
        dataIndex: EColumnKey.Coefficient0,
        width: 140,
        sorter: true,
      },
      [EColumnKey.Coefficient1]: {
        dataIndex: EColumnKey.Coefficient1,
        width: 140,
        sorter: true,
      },
      [EColumnKey.Coefficient2]: {
        dataIndex: EColumnKey.Coefficient2,
        width: 140,
        sorter: true,
      },
      [EColumnKey.Coefficient3]: {
        dataIndex: EColumnKey.Coefficient3,
        width: 140,
        sorter: true,
      },
      [EColumnKey.Coefficient4]: {
        dataIndex: EColumnKey.Coefficient4,
        width: 140,
        sorter: true,
      },
      [EColumnKey.Coefficient5]: {
        dataIndex: EColumnKey.Coefficient5,
        width: 140,
        sorter: true,
      },
      [EColumnKey.Quantity]: {
        dataIndex: EColumnKey.Quantity,
        width: 140,
        sorter: true,
      },
      [EColumnKey.UnitPrice]: {
        dataIndex: EColumnKey.UnitPrice,
        width: 140,
        sorter: true,
      },
      [EColumnKey.Total]: {
        dataIndex: EColumnKey.Total,
        minWidth: 160,
        restWidth: true,
        sorter: true,
      },
    } as Partial<Record<EColumnKey, ColumnType<ITableData>>>
  }, [orderMap, productMap])

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
