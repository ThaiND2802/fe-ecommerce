import { Flex, FlexProps } from 'antd'
import cn from 'classnames'

import styles from './index.module.less'

interface IconWrapperProps extends FlexProps {}

const Index: React.FC<IconWrapperProps> = ({ className, ...props }) => {
  return (
    <Flex className={cn(styles.iconWrapper, className)} align="center" justify="center" {...props} />
  )
}

export default Index
