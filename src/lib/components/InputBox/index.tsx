import { useState } from 'react'
import { Flex, Input } from 'antd'
import { TextAreaProps } from 'antd/lib/input/TextArea'
import classNames from 'classnames'

import styles from './index.module.less'

interface Props extends TextAreaProps {
  actions?: React.ReactNode
  children?: React.ReactNode
}

const Index = ({ className, actions, children, ...props }: Props) => {
  const [isFocus, setIsFocus] = useState(false)

  return (
    <Flex
      className={classNames(
        styles.component,
        {
          [styles.focus]: isFocus,
        },
        className,
      )}>
      <Input.TextArea
        autoSize
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        {...props}
      />
      {children}
      {actions}
    </Flex>
  )
}

export default Index
