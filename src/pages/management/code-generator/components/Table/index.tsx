import { useMemo } from 'react'
import { Flex } from 'antd'
import Empty from 'src/lib/components/Empty'
import Table, { ColumnType } from 'src/lib/components/Table'
import Actions from 'src/lib/components/Table/actions'
import { formatDateWithTime } from 'src/utils/date'
import useLocaleGroup from 'src/locales/useLocaleGroup'
import ActionMenu from '../ActionMenu'
import PopupDelete from '../PopupDelete'
import { EColumnKey } from './column'
import { ITableData, useTableData } from './hook'
import styles from './index.module.less'

const Index = () => {
  const [t] = useLocaleGroup('codeGenerator')
  const { columns, datasource, tableParams, isLoading, handleTableChange } = useTableData()

  const columnMap = useMemo(() => {
    return {
      [EColumnKey.Id]: {
        dataIndex: EColumnKey.Id,
        width: 140,
        sorter: true,
      },
      [EColumnKey.Prefix]: {
        dataIndex: EColumnKey.Prefix,
        width: 180,
        sorter: true,
      },
      [EColumnKey.LastNumber]: {
        dataIndex: EColumnKey.LastNumber,
        width: 140,
        sorter: true,
      },
      [EColumnKey.CreatedAt]: {
        dataIndex: EColumnKey.CreatedAt,
        width: 180,
        sorter: true,
        render: (value: string) => formatDateWithTime(value),
      },
      [EColumnKey.UpdatedAt]: {
        dataIndex: EColumnKey.UpdatedAt,
        width: 180,
        sorter: true,
        render: (value: string) => formatDateWithTime(value),
      },
    } as Partial<Record<EColumnKey, ColumnType<ITableData>>>
  }, [])

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
            <ActionMenu id={record.id} title={record.prefix || record.id} />
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
