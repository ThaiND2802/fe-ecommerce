import { Flex } from 'antd'
import classNames from 'classnames'

import SvgIcon from './empty.svg'
import useLocale from '../../locales/useLocale'

import styles from './index.module.less'

interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  showMessage?: boolean
  message?: string
  width?: number
}

const Index = ({ className, message, width = 187, showMessage = true, ...props }: EmptyProps) => {
  const [c] = useLocale('common')
  return (
    <Flex className={classNames(styles.wrapper, className)} {...props}>
      <img src={SvgIcon} alt="empty" style={{ width }} />
      {showMessage && <p className={styles.text}>{message || c.text.noData}</p>}
    </Flex>
  )
}

export default Index
