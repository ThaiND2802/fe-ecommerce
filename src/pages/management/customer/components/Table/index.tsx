import { useMemo } from 'react'
import { Flex } from 'antd'
import Table, { ColumnType } from 'src/lib/components/Table'
import Ellipsis from 'src/lib/components/Ellipsis'
import useLocaleGroup from 'src/locales/useLocaleGroup'
import { EColumnKey } from './column'
import { ITableData, useTableData } from './hook'
import styles from './index.module.less'
import Actions from 'src/lib/components/Table/actions'
import Empty from 'src/lib/components/Empty'
import ActionMenu from '../ActionMenu'
import PopupDelete from '../PopupDelete'

const Index = () => {
  const [t] = useLocaleGroup('customer')
  const { columns, datasource, tableParams, isLoading, handleTableChange } = useTableData()

  const columnMap = useMemo(() => {
    return {
      [EColumnKey.Code]: {
        dataIndex: EColumnKey.Code,
        width: 100,
        sorter: true,
      },
      [EColumnKey.Name]: {
        dataIndex: EColumnKey.Name,
        restWidth: true,
        minWidth: 280,
        sorter: true,
        render: (text) => <Ellipsis line={2}>{text}</Ellipsis>,
      },
      [EColumnKey.Email]: {
        dataIndex: EColumnKey.Email,
        width: 130,
        sorter: true,
      },
      [EColumnKey.Phone]: {
        dataIndex: EColumnKey.Phone,
        width: 190,
        sorter: true,
      },
      [EColumnKey.Address]: {
        dataIndex: EColumnKey.Address,
        width: 180,
        sorter: true,
      },
      [EColumnKey.TaxCode]: {
        dataIndex: EColumnKey.TaxCode,
        width: 180,
        sorter: true,
      },
      [EColumnKey.ContactPerson]: {
        dataIndex: EColumnKey.ContactPerson,
        width: 180,
        sorter: true,
      },
      [EColumnKey.CreditLimit]: {
        dataIndex: EColumnKey.CreditLimit,
        width: 180,
        sorter: true,
      },
      [EColumnKey.CurrentDebt]: {
        dataIndex: EColumnKey.CurrentDebt,
        width: 180,
        sorter: true,
      },
      [EColumnKey.CustomerType]: {
        dataIndex: EColumnKey.CustomerType,
        width: 180,
        sorter: true,
      },
    } as Partial<Record<EColumnKey, ColumnType<ITableData>>>
  }, [columns])

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
        .map((c) => ({
          ...columnMap[c.key],
          title: c.label,
        })),
      {
        key: 'action',
        width: 1,
        fixed: 'right',
        render: (text: string, record: ITableData) => (
          <Actions>
            <ActionMenu id={record.id} title={record.name as any || ''} />
          </Actions>),
      }
    ]
  }, [columns, tableParams.pagination, t])

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
          emptyText: <Empty />
        }}
      />
      <PopupDelete />
    </Flex>
  )
}

export default Index
