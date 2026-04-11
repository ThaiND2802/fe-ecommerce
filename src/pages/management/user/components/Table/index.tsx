import { useMemo } from 'react'
import { Flex } from 'antd'
import Empty from 'src/lib/components/Empty'
import Ellipsis from 'src/lib/components/Ellipsis'
import Table, { ColumnType } from 'src/lib/components/Table'
import Actions from 'src/lib/components/Table/actions'
import Tag from 'src/lib/components/Tag'
import useLocaleGroup from 'src/locales/useLocaleGroup'
import ActionMenu from '../ActionMenu'
import PopupDelete from '../PopupDelete'
import { EColumnKey } from './column'
import { ITableData, useTableData } from './hook'
import styles from './index.module.less'

const Index = () => {
  const [t] = useLocaleGroup('user')
  const { columns, datasource, tableParams, isLoading, handleTableChange } = useTableData()

  const columnMap = useMemo(() => {
    return {
      [EColumnKey.Id]: { dataIndex: EColumnKey.Id, width: 180, sorter: true },
      [EColumnKey.FullName]: {
        dataIndex: EColumnKey.FullName,
        minWidth: 220,
        restWidth: true,
        sorter: true,
        render: (text: string) => <Ellipsis line={2}>{text}</Ellipsis>,
      },
      [EColumnKey.Email]: { dataIndex: EColumnKey.Email, width: 220, sorter: true },
      [EColumnKey.Phone]: { dataIndex: EColumnKey.Phone, width: 160, sorter: true },
      [EColumnKey.Image]: { dataIndex: EColumnKey.Image, width: 180, sorter: true },
      [EColumnKey.Gender]: { dataIndex: EColumnKey.Gender, width: 120, sorter: true },
      [EColumnKey.DateOfBirth]: { dataIndex: EColumnKey.DateOfBirth, width: 160, sorter: true },
      [EColumnKey.Address]: {
        dataIndex: EColumnKey.Address,
        width: 220,
        sorter: true,
        render: (text: string) => <Ellipsis line={2}>{text}</Ellipsis>,
      },
      [EColumnKey.DepartmentId]: { dataIndex: EColumnKey.DepartmentId, width: 160, sorter: true },
      [EColumnKey.PositionId]: { dataIndex: EColumnKey.PositionId, width: 160, sorter: true },
      [EColumnKey.JobTitleId]: { dataIndex: EColumnKey.JobTitleId, width: 160, sorter: true },
      [EColumnKey.AvatarUrl]: { dataIndex: EColumnKey.AvatarUrl, width: 200, sorter: true },
      [EColumnKey.HireDate]: { dataIndex: EColumnKey.HireDate, width: 160, sorter: true },
      [EColumnKey.RefreshToken]: {
        dataIndex: EColumnKey.RefreshToken,
        width: 220,
        sorter: true,
        render: (text: string) => <Ellipsis line={2}>{text}</Ellipsis>,
      },
      [EColumnKey.RefreshTokenExpiryTime]: {
        dataIndex: EColumnKey.RefreshTokenExpiryTime,
        width: 200,
        sorter: true,
      },
      [EColumnKey.IsActive]: {
        dataIndex: EColumnKey.IsActive,
        width: 140,
        sorter: true,
        render: (value: string | boolean) => {
          const active = value === true || value === 'true' || value === '1'
          return <Tag color={active ? 'green' : 'light-gray'}>{active ? 'Active' : 'Inactive'}</Tag>
        },
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
            <ActionMenu id={record.id} title={record.full_name || ''} />
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
