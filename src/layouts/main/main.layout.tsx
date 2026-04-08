import { Layout } from 'antd'
import React from 'react'
import classNames from 'classnames'

import usePageMode from 'src/hook/use-page-mode'
import Header from './header'
import styles from './main.layout.module.less'

interface IProps {
  children: React.ReactNode
}

const MainLayout: React.FC<IProps> = ({ children }) => {
  const { isHiddenHeader, isForPrinting } = usePageMode()

  if (isHiddenHeader && isForPrinting) {
    return children
  }

  return (
    <Layout
      className={classNames(styles.container, {
        [styles.withHeader]: !isHiddenHeader,
        [styles.forPrinting]: isForPrinting,
      })}>
      <Header />
      <Layout.Content>{children}</Layout.Content>
    </Layout>
  )
}

export default MainLayout
