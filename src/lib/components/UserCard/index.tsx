import { Flex, FlexProps } from 'antd'
import classNames from 'classnames'

import UserAvatar from 'src/lib/components/UserAvatar'

import styles from './index.module.less'

export interface UserCardProps extends Omit<FlexProps, 'children'> {
  id: string
  avatar?: string
  name?: string
  email?: string
  phone?: string
  otherInfo?: React.ReactNode
  color?: 'red' | 'green' | 'normal'
}

const Index = ({
  className,
  avatar,
  name,
  email,
  phone,
  otherInfo,
  color = 'normal',
  ...props
}: UserCardProps) => {
  return (
    <Flex className={classNames(styles.userCard, styles[color], className)} {...props}>
      <UserAvatar className={styles.avatar} image={avatar} size={28} />
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        {email && <div className={styles.email}>{email}</div>}
        {phone && <div className={styles.phone}>{phone}</div>}
        {otherInfo && <div className={styles.otherInfo}>{otherInfo}</div>}
      </div>
    </Flex>
  )
}

export default Index
