import { useState } from 'react'
import Flex from 'antd/lib/flex'
import { FlexProps } from 'antd/lib/flex/interface'
import classNames from 'classnames'

import Icon from 'src/lib/components/Icon'

import styles from './index.module.less'

interface Props extends Omit<FlexProps, 'children'> {
  active?: boolean
}

const Index = ({ active, onClick, ...props }: Props) => {
  const [hover, setHover] = useState(false)
  const iconName = active || hover ? 'star-filled' : 'star'

  return (
    <Flex
      onClick={onClick}
      {...props}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <Icon
        className={classNames(styles.icon, { [styles.active]: active || hover })}
        name={iconName}
        size={20}
      />
    </Flex>
  )
}

export default Index
