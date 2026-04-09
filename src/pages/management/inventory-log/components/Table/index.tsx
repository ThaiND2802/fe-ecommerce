import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Flex } from 'antd'
import Ellipsis from 'src/lib/components/Ellipsis'
import Empty from 'src/lib/components/Empty'
import Table, { ColumnType } from 'src/lib/components/Table'
import Actions from 'src/lib/components/Table/actions'
import { inventoryQueries } from 'src/entities/management/inventory'
import useLocaleGroup from 'src/locales/useLocaleGroup'
import ActionMenu from '../ActionMenu'
import PopupDelete from '../PopupDelete'
import { EColumnKey } from './column'
import { ITableData, useTableData } from './hook'
import styles from './index.module.less'

const Index = () => {
  const [t] = useLocaleGroup('inventoryLog')
  const { columns, datasource, tableParams, isLoading, handleTableChange } = useTableData()
  const { data: inventoryList } = useQuery({
    ...inventoryQueries.list({
      page_index: 0,
      page_size: 100,
    }),
  })

  const inventoryMap = useMemo(() => {
    return (inventoryList?.data || []).reduce<Record<string, string>>((acc, item) => {
      acc[item.id] = `${item.id} - ${item.product_id}`
      return acc
    }, {})
  }, [inventoryList?.data])

  const columnMap = useMemo(() => {
    return {
      [EColumnKey.Id]: {
        dataIndex: EColumnKey.Id,
        width: 160,
        sorter: true,
      },
      [EColumnKey.InventoryId]: {
        dataIndex: EColumnKey.InventoryId,
        width: 220,
        sorter: true,
        render: (value: string) => inventoryMap[value] || value,
      },
      [EColumnKey.MovementType]: {
        dataIndex: EColumnKey.MovementType,
        width: 140,
        sorter: true,
      },
      [EColumnKey.Quantity]: {
        dataIndex: EColumnKey.Quantity,
        width: 140,
        sorter: true,
      },
      [EColumnKey.Balance]: {
        dataIndex: EColumnKey.Balance,
        width: 140,
        sorter: true,
      },
      [EColumnKey.ReferenceId]: {
        dataIndex: EColumnKey.ReferenceId,
        width: 180,
        sorter: true,
      },
      [EColumnKey.ReferenceType]: {
        dataIndex: EColumnKey.ReferenceType,
        width: 180,
        sorter: true,
      },
      [EColumnKey.Notes]: {
        dataIndex: EColumnKey.Notes,
        minWidth: 220,
        restWidth: true,
        sorter: true,
        render: (text: string) => <Ellipsis line={2}>{text}</Ellipsis>,
      },
    } as Partial<Record<EColumnKey, ColumnType<ITableData>>>
  }, [inventoryMap])

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
