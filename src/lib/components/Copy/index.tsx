import React from 'react'
import { Flex, FlexProps } from 'antd'

import Icon from '../Icon'
import useMessage from '../../hooks/message'
import useLocale from '../../locales/useLocale'

import styles from './index.module.less'

interface IProps extends FlexProps {
  children: React.ReactNode
  text?: string
  onCopy?: () => void
}

const Index = ({ children, text, onCopy }: IProps) => {
  const [t] = useLocale('Copy')
  const { message } = useMessage()
  const handleCopy = () => {
    navigator?.clipboard?.writeText?.(text || (children as string))
    message.success(t.copied)
  }

  return (
    <Flex>
      {children}
      <Icon className={styles.icon} name="copy" size={20} onClick={handleCopy} />
    </Flex>
  )
}

export default Index
