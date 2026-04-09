import { useMemo } from 'react'
import { Flex } from 'antd'
import Empty from 'src/lib/components/Empty'
import Ellipsis from 'src/lib/components/Ellipsis'
import Tag from 'src/lib/components/Tag'
import Table, { ColumnType } from 'src/lib/components/Table'
import Actions from 'src/lib/components/Table/actions'
import { formatDate } from 'src/utils/date'
import useLocaleGroup from 'src/locales/useLocaleGroup'
import ActionMenu from '../ActionMenu'
import PopupDelete from '../PopupDelete'
import { EColumnKey } from './column'
import { ITableData, useTableData } from './hook'
import styles from './index.module.less'
import { OrderStatus, OrderType } from 'src/entities/management/order'

const Index = () => {
  const [t] = useLocaleGroup('order')
  const { columns, datasource, tableParams, isLoading, handleTableChange } = useTableData()

  const orderStatusMap = useMemo(() => {
    return {
      [OrderStatus.Draft]: { label: t.status.draft, color: 'gray' as const },
      [OrderStatus.Confirmed]: { label: t.status.confirmed, color: 'blue' as const },
      [OrderStatus.WaitingDelivery]: { label: t.status.waiting_delivery, color: 'orange' as const },
      [OrderStatus.Delivering]: { label: t.status.delivering, color: 'purple' as const },
      [OrderStatus.Completed]: { label: t.status.completed, color: 'green' as const },
      [OrderStatus.DeliveryFailed]: { label: t.status.delivery_failed, color: 'red' as const },
      [OrderStatus.Cancelled]: { label: t.status.cancelled, color: 'light-gray' as const },
    }
  }, [t.status])

  const orderTypeMap = useMemo(() => {
    return {
      [OrderType.Retail]: t.order_type.retail,
      [OrderType.Wholesale]: t.order_type.wholesale,
      [OrderType.Online]: t.order_type.online,
    }
  }, [t.order_type])

  const columnMap = useMemo(() => {
    return {
      [EColumnKey.OrderCode]: {
        dataIndex: EColumnKey.OrderCode,
        width: 160,
        sorter: true,
      },
      [EColumnKey.CustomerId]: {
        dataIndex: EColumnKey.CustomerId,
        width: 180,
        sorter: true,
      },
      [EColumnKey.OrderDate]: {
        dataIndex: EColumnKey.OrderDate,
        width: 140,
        sorter: true,
        render: (value: string) => formatDate(value),
      },
      [EColumnKey.DueDate]: {
        dataIndex: EColumnKey.DueDate,
        width: 140,
        sorter: true,
        render: (value: string) => formatDate(value),
      },
      [EColumnKey.OrderType]: {
        dataIndex: EColumnKey.OrderType,
        width: 140,
        sorter: true,
        render: (value: OrderType) => orderTypeMap[value] || value,
      },
      [EColumnKey.DeliveryAddress]: {
        dataIndex: EColumnKey.DeliveryAddress,
        minWidth: 220,
        restWidth: true,
        sorter: true,
        render: (text: string) => <Ellipsis line={2}>{text}</Ellipsis>,
      },
      [EColumnKey.VatRate]: {
        dataIndex: EColumnKey.VatRate,
        width: 120,
        sorter: true,
        render: (value: number) => `${value ?? 0}%`,
      },
      [EColumnKey.VatAmount]: {
        dataIndex: EColumnKey.VatAmount,
        width: 140,
        sorter: true,
      },
      [EColumnKey.TotalAmount]: {
        dataIndex: EColumnKey.TotalAmount,
        width: 140,
        sorter: true,
      },
      [EColumnKey.TotalAmountWithVat]: {
        dataIndex: EColumnKey.TotalAmountWithVat,
        width: 180,
        sorter: true,
      },
      [EColumnKey.AmountPaid]: {
        dataIndex: EColumnKey.AmountPaid,
        width: 140,
        sorter: true,
      },
      [EColumnKey.DebtAmount]: {
        dataIndex: EColumnKey.DebtAmount,
        width: 140,
        sorter: true,
      },
      [EColumnKey.PaymentMethod]: {
        dataIndex: EColumnKey.PaymentMethod,
        width: 160,
        sorter: true,
      },
      [EColumnKey.Status]: {
        dataIndex: EColumnKey.Status,
        width: 180,
        sorter: true,
        render: (value: OrderStatus) => {
          const item = orderStatusMap[value]
          return <Tag color={item?.color}>{item?.label || value}</Tag>
        },
      },
      [EColumnKey.Note]: {
        dataIndex: EColumnKey.Note,
        width: 220,
        sorter: true,
        render: (text: string) => <Ellipsis line={2}>{text}</Ellipsis>,
      },
    } as Partial<Record<EColumnKey, ColumnType<ITableData>>>
  }, [orderStatusMap, orderTypeMap])

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
            <ActionMenu id={record.id} title={record.order_code || ''} />
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
