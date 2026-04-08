import React from 'react'
import classNames from 'classnames'
import { Flex } from 'antd'

import styles from './index.module.less'

interface IconOuterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Index = ({ children, className, ...otherProps }: IconOuterProps) => {
  return (
    <Flex className={classNames(styles.iconOuter, className)} {...otherProps}>
      {children}
    </Flex>
  )
}

export default Index
