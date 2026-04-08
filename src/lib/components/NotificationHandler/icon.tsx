import { Flex } from 'antd'

import cn from 'classnames'

import Icon from '../Icon'
import styles from './icon.module.less'

const Index = ({ type }: { type: 'success' | 'error' | 'loading' }) => {
  let icon = null

  switch (type) {
    case 'success':
      icon = <Icon name="checks" size={20} />
      break
    case 'error':
      icon = <Icon name="exclamation" size={20} />
      break
    case 'loading':
      icon = <Icon name="loading" size={26} />
      break
  }

  return <Flex className={cn(styles.icon, styles[type])}>{icon}</Flex>
}

export default Index
