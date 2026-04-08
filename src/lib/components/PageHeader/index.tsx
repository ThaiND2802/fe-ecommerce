import { HTMLAttributes } from 'react'
import { Flex } from 'antd'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'

import Ellipsis from '../Ellipsis'
import { ActionIcon } from '../ActionIcon'
import IconSax from '../IconSax'
import styles from './index.module.less'

export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: string | React.ReactNode
  actions?: React.ReactNode[]
  back?: boolean
  standalone?: boolean
  iconSize?: number
  onBack?: () => void
}

const Index = ({
  className,
  title,
  actions,
  back,
  standalone,
  iconSize = 20,
  onBack,
}: PageHeaderProps) => {
  const navigate = useNavigate()

  const backHandler = () => {
    if (onBack) {
      onBack()
      return
    }

    navigate(-1)
  }

  return (
    <Flex className={classNames(styles.pageHeader, className, { [styles.standalone]: standalone })}>
      {back && (
        <ActionIcon className={styles.backIcon} onClick={backHandler}>
          <IconSax name="arrow-left" size={iconSize} />
        </ActionIcon>
      )}
      <Ellipsis line={2} className={styles.title}>
        {title}
      </Ellipsis>
      {!!actions?.length && <Flex className={styles.actions}>{actions}</Flex>}
    </Flex>
  )
}

export default Index
