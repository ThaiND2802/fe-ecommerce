import { Flex, FlexProps } from 'antd'
import classNames from 'classnames'

import useLocaleGroup from 'src/locales/useLocaleGroup'
import SvgIcon from './SvgIcon'

import styles from './index.module.less'

interface EmptyProps extends Omit<FlexProps, 'children'> {
  message?: string
}

const Index = ({ className, message, ...props }: EmptyProps) => {
  const [c] = useLocaleGroup('common')
  return (
    <Flex className={classNames(styles.wrapper, className)} justify="center" {...props}>
      <SvgIcon />
      <p className={styles.text}>{message || c.text.noData}</p>
    </Flex>
  )
}

export default Index
