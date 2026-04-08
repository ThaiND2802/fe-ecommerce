import { Flex, Skeleton, Tabs } from 'antd'
import { useQuery } from '@tanstack/react-query'

import { contactQueries } from 'src/lib/entities/contact'
import useLocale from 'src/lib/locales/useLocale'

import UserAvatar from '../UserAvatar'
import IconSax from '../IconSax'

import styles from './index.module.less'

export interface ContactProps {
  userId: string
}

const IconContent = ({ icon, content }: { icon: React.ReactNode; content: React.ReactNode }) => {
  return (
    <Flex align="center" gap={20} className={styles.iconContent}>
      {icon}
      <span className={styles.info}>{content}</span>
    </Flex>
  )
}

const Contact = ({ userId }: ContactProps) => {
  const [t] = useLocale('ContactPopover')
  const { data, isFetching } = useQuery(contactQueries.detail(userId))

  const infoTab = {
    label: t.info,
    key: 'info',
    children: (
      <Flex className={styles.infoContainer} vertical gap={10}>
        <IconContent
          icon={<IconSax name="mail" size={22} />}
          content={<span>{data?.email}</span>}
        />
        <IconContent
          icon={<IconSax name="phone" size={22} />}
          content={<span>{data?.phone_number}</span>}
        />
        <IconContent
          icon={<IconSax name="building-1" size={22} />}
          content={<span>{data?.company_name}</span>}
        />
      </Flex>
    ),
  }

  if (isFetching) {
    return (
      <Flex style={{ width: 300 }}>
        <Skeleton active />
      </Flex>
    )
  }

  return (
    <>
      <Flex gap={10}>
        <UserAvatar size={80} iconSize={40} image={data?.image} />
        <div>
          <div className={styles.name}>{data?.full_name}</div>
          <div className={styles.position}>{data?.job}</div>
          <div className={styles.department}>{data?.department_name}</div>
        </div>
      </Flex>
      <Tabs items={[infoTab]} />
    </>
  )
}

export default Contact
