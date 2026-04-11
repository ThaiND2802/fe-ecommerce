import { useMemo } from 'react'
import { Flex } from 'antd'
import Empty from 'src/lib/components/Empty'
import Ellipsis from 'src/lib/components/Ellipsis'
import Table, { ColumnType } from 'src/lib/components/Table'
import Actions from 'src/lib/components/Table/actions'
import useLocaleGroup from 'src/locales/useLocaleGroup'
import ActionMenu from '../ActionMenu'
import PopupDelete from '../PopupDelete'
import { EColumnKey } from './column'
import { ITableData, useTableData } from './hook'
import styles from './index.module.less'

const Index = () => {
  const [t] = useLocaleGroup('tenant')
  const { columns, datasource, tableParams, isLoading, handleTableChange } = useTableData()

  const columnMap = useMemo(() => {
    return {
      [EColumnKey.Id]: {
        dataIndex: EColumnKey.Id,
        width: 180,
        sorter: true,
      },
      [EColumnKey.Name]: {
        dataIndex: EColumnKey.Name,
        minWidth: 220,
        restWidth: true,
        sorter: true,
        render: (text: string) => <Ellipsis line={2}>{text}</Ellipsis>,
      },
      [EColumnKey.Schema]: {
        dataIndex: EColumnKey.Schema,
        width: 220,
        sorter: true,
      },
    } as Partial<Record<EColumnKey, ColumnType<ITableData>>>
  }, [])

  const columnsToRender = useMemo(() => {
    return [
      {
        title: t.table.columns.no,
        width: 60,
        render: (_text: string, _record: ITableData, index: number) => {
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
