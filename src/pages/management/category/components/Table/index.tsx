import { useMemo } from 'react'
import { Flex } from 'antd'
import Empty from 'src/lib/components/Empty'
import Ellipsis from 'src/lib/components/Ellipsis'
import Tag from 'src/lib/components/Tag'
import Table, { ColumnType } from 'src/lib/components/Table'
import Actions from 'src/lib/components/Table/actions'
import useLocaleGroup from 'src/locales/useLocaleGroup'
import { ItemStatus } from 'src/entities/management/category'
import ActionMenu from '../ActionMenu'
import PopupDelete from '../PopupDelete'
import { EColumnKey } from './column'
import { ITableData, useTableData } from './hook'
import styles from './index.module.less'

const Index = () => {
  const [t] = useLocaleGroup('category')
  const { columns, datasource, tableParams, isLoading, handleTableChange } = useTableData()

  const statusMap = useMemo(() => {
    return {
      [ItemStatus.InActive]: { label: t.status.inactive, color: 'light-gray' as const },
      [ItemStatus.Active]: { label: t.status.active, color: 'green' as const },
      [ItemStatus.Deleted]: { label: t.status.deleted, color: 'red' as const },
    }
  }, [t.status])

  const columnMap = useMemo(() => {
    return {
      [EColumnKey.Id]: {
        dataIndex: EColumnKey.Id,
        width: 160,
        sorter: true,
      },
      [EColumnKey.Name]: {
        dataIndex: EColumnKey.Name,
        width: 220,
        sorter: true,
      },
      [EColumnKey.Description]: {
        dataIndex: EColumnKey.Description,
        minWidth: 280,
        restWidth: true,
        sorter: true,
        render: (text: string) => <Ellipsis line={2}>{text}</Ellipsis>,
      },
      [EColumnKey.Status]: {
        dataIndex: EColumnKey.Status,
        width: 140,
        sorter: true,
        render: (value: ItemStatus) => {
          const item = statusMap[value]
          return <Tag color={item?.color}>{item?.label || value}</Tag>
        },
      },
    } as Partial<Record<EColumnKey, ColumnType<ITableData>>>
  }, [statusMap])

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
