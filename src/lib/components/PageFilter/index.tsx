import { Collapse, CollapseProps } from 'antd'
import cn from 'classnames'

import styles from './index.module.less'

export interface IProps extends CollapseProps {
  visible: boolean
  children: React.ReactNode
}

const Index = ({ className, visible, children, ...props }: IProps) => {
  return (
    <Collapse
      className={cn(styles.collapse, className)}
      ghost
      activeKey={visible ? ['content'] : []}
      {...props}>
      <Collapse.Panel header={null} key="content" showArrow={false}>
        {children}
      </Collapse.Panel>
    </Collapse>
  )
}

export default Index
