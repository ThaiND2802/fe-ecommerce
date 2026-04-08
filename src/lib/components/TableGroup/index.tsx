import classNames from 'classnames'

import Table, { ITableProps } from 'src/lib/components/Table'

import styles from './index.module.less'

type GroupRecord<T> = T & {
  isGroup?: boolean
  groupValue?: string
}

interface ITableGroupProps<T> extends ITableProps<T> {
  groupField?: string
}

const TableGroup = <T,>({
  className,
  wrapperClassName,
  groupField,
  ...props
}: ITableGroupProps<T>) => {
  return (
    <Table<GroupRecord<T>>
      className={classNames(styles.table, className)}
      wrapperClassName={classNames(styles.wrapper, wrapperClassName)}
      onRow={(record) => ({
        className: record.isGroup ? 'group' : '',
      })}
      {...props}
    />
  )
}

export default TableGroup
