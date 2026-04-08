import { Flex, FlexProps } from 'antd'
import classNames from 'classnames'

import styles from './index.module.less'

interface IProps extends Omit<FlexProps, 'title' | 'children'> {
  title: React.ReactNode
  stickyTop?: number
  children?: React.ReactNode
}

const Index = ({ children, title, className, stickyTop, style, ...props }: IProps) => {
  return (
    <Flex
      className={classNames(styles.component, className)}
      style={{
        ...style,
        top: stickyTop,
        position: stickyTop === undefined ? 'relative' : 'sticky',
        zIndex: stickyTop === undefined ? undefined : 1,
      }}
      {...props}>
      <h2 className={styles.title} title={typeof title === 'string' ? title : undefined}>
        {title}
      </h2>
      {children && <Flex className={styles.actions}>{children}</Flex>}
    </Flex>
  )
}

export default Index
