import { Outlet } from 'react-router-dom'
import cn from 'classnames'

import PageLayout from 'src/lib/components/PageLayout'
import PageSider from 'src/components/PageSider'

import styles from './index.module.less'

const { responsive } = globalThis.moduleConfig

const Layout = () => {
  return (
    <PageLayout className={cn(styles.layout, { [styles.layoutResponsive]: responsive })}>
      <PageSider />
      <PageLayout.Content>
        <Outlet />
      </PageLayout.Content>
    </PageLayout>
  )
}

export const PrintLayout = () => {
  return <Outlet />
}

export default Layout
