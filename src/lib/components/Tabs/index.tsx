import { Tabs as AntdTabs, TabsProps as AntdTabsProps } from 'antd'
import cn from 'classnames'

import styles from './index.module.less'

export interface TabsProps extends AntdTabsProps {}

const Index = ({ className, ...props }: TabsProps) => {
  return <AntdTabs className={cn(styles.tabs, className)} {...props} />
}

export default Index
