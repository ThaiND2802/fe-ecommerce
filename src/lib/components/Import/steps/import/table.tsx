import Table from '../../../../components/Table'

import { useTableData } from './hooks'
import styles from '../style.module.less'

const Index = ({
  getImportDataApiUrl,
  invisible,
}: {
  getImportDataApiUrl: string
  invisible?: boolean
}) => {
  const { columns, datasource, tableParams, isLoading, handleTableChange, onRow } = useTableData({
    getImportDataApiUrl,
    invisible,
  })

  return (
    <Table
      className={styles.table}
      columns={columns}
      dataSource={datasource}
      pagination={tableParams.pagination}
      onChange={handleTableChange}
      deafaultColumnWidth={200}
      loading={isLoading}
      showTotal
      bordered
      onRow={onRow}
    />
  )
}

export default Index
