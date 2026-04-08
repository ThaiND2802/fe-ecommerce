import React from 'react'

import styles from './index.module.less'

interface IProps {
  children: React.ReactNode
}

const Index = ({ children }: IProps) => {
  return <div className={styles.title}>{children}</div>
}

export default Index
