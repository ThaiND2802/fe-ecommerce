import { Flex, FlexProps } from 'antd'
import cn from 'classnames'

import styles from './index.module.less'

interface IProps extends FlexProps {
  top?: number
}

const Actions = ({ children, top, ...props }: IProps) => {
  return (
    <Flex
      className={cn(styles.rowActions)}
      onClick={(e) => e.stopPropagation()}
      {...props}
      {...(top ? { style: { top } } : {})}>
      {children}
    </Flex>
  )
}

export default Actions
