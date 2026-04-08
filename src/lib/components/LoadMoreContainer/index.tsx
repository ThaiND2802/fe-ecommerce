import React from 'react'
import classNames from 'classnames'

import styles from './index.module.less'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  onLoadMore?: () => void
}

const Index = ({ className, children, onLoadMore }: Props) => {
  return <div className={classNames(styles.container, className)}>{children}</div>
}

export default Index
