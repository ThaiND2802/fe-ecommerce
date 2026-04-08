import classNames from 'classnames'

import Table, { ITableProps } from 'src/lib/components/Table'

import styles from './index.module.less'

interface ITableLoadMoreProps<T> extends ITableProps<T> {}

const TableLoadMore = <T,>({ className, wrapperClassName, ...props }: ITableLoadMoreProps<T>) => {
  return (
    <Table<T>
      className={classNames(styles.table, className)}
      wrapperClassName={classNames(styles.wrapper, wrapperClassName)}
      {...props}
    />
  )
}

export default TableLoadMore
