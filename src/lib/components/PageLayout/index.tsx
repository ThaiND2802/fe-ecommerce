import { Flex, Layout, LayoutProps } from 'antd'
import type { SiderProps as AntdSiderProps } from 'antd/es/layout/Sider'
import classNames from 'classnames'

import Icon from '../Icon'
import styles from './index.module.less'

interface PageLayoutProps extends LayoutProps {}

const siderWidth = 230

const PageLayout = ({ className, ...props }: PageLayoutProps) => {
  return <Layout className={classNames(styles.layout, className)} {...props} />
}

export interface SiderProps extends AntdSiderProps {
  autoHideToggleButton?: boolean
  allowToggle?: boolean
}
PageLayout.Sider = ({
  className,
  children,
  autoHideToggleButton = true,
  allowToggle = true,
  ...props
}: SiderProps) => {
  const handleCollapse = () => {
    props.onCollapse?.(!props.collapsed, 'clickTrigger')
  }
  return (
    <Layout.Sider
      className={classNames(
        styles.sider,
        {
          [styles.noToggle]: !allowToggle,
        },
        className,
      )}
      width={siderWidth}
      {...props}>
      {children}
      {allowToggle && (
        <Flex
          className={classNames(styles.toggleButton, {
            [styles.autoHide]: autoHideToggleButton,
          })}
          onClick={handleCollapse}>
          <Icon
            className={styles.toggleButtonIcon}
            style={{
              transform: props.collapsed ? 'rotate(90deg)' : 'rotate(-90deg)',
            }}
            name="arrow-up"
            size={20}
          />
        </Flex>
      )}
    </Layout.Sider>
  )
}

interface ContentProps extends LayoutProps {}
PageLayout.Content = ({ ...props }: ContentProps) => {
  return <Layout.Content {...props} />
}

export default PageLayout
