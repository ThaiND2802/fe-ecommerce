import { useMemo } from 'react'
import { Flex } from 'antd'
import classNames from 'classnames'

import SelectSearch, { SelectSearchProps } from '../SelectSearchCustomValue'
import UserAvatar, { DefaultIcon } from '../UserAvatar'
import IconSax from '../IconSax'
import Icon from '../Icon'
import useLocale from '../../locales/useLocale'
import { normalizeText } from '../../utils/normalizeText'

import styles from './index.module.less'

export enum MemberType {
  USER = 'user',
  USER_GROUP = 'user_group',
  LINKED_GROUP = 'linked_group',
  TENANT = 'tenant',
}

export interface ItemData {
  id: string
  name: string
  email: string
  image?: string
  jobName?: string
  memberCount?: number
  isExpired?: boolean
  type?: MemberType
}

export interface StackMemberSelectProps extends SelectSearchProps<ItemData> {
  options?: ItemData[]
  exclude?: string[]
  isLoading?: boolean
}

const ItemIcon = {
  [MemberType.USER_GROUP]: DefaultIcon.USER_GROUP,
  [MemberType.LINKED_GROUP]: DefaultIcon.SYSTEM_GROUP,
  [MemberType.USER]: DefaultIcon.USER,
}

const Index = ({
  className,
  options = [],
  exclude = [],
  isLoading = false,
  ...otherProps
}: StackMemberSelectProps) => {
  const [_, trans] = useLocale('StackMemberSelect')
  const memberList = options
  const memberMap: Record<string, ItemData> = useMemo(() => {
    return (
      memberList.reduce((acc, item) => {
        acc[item.id] = item
        return acc
      }, {}) || {}
    )
  }, [memberList])

  const optionRender = ({ data }: { data: ItemData }) => {
    const isSelected = otherProps.value?.includes(data.id)

    if (data.type !== MemberType.USER) {
      return (
        <Flex align="center" gap={10}>
          <UserAvatar className={styles.userAvatar} size={28} defaultIcon={ItemIcon[data.type]} />
          <Flex vertical className={styles.info}>
            <div className={styles.groupName}>{data.name}</div>
            <div className={styles.memberCount}>
              {trans('StackMemberSelect.members', { count: data.memberCount ?? 0 })}
            </div>
          </Flex>
          {isSelected && <Icon name="checks" className={styles.checkIcon} />}
        </Flex>
      )
    }
    return (
      <Flex align="center" gap={10}>
        <UserAvatar
          className={styles.userAvatar}
          size={28}
          image={data.image}
          defaultIcon={ItemIcon[data?.type]}
        />
        <Flex vertical className={styles.info}>
          <Flex className={styles.emailName} align="center" wrap>
            <span className={styles.userName}>{data.name}</span>
            <span className={styles.userEmail}>{data.email}</span>
            {data.isExpired && (
              <IconSax className={styles.expiredIcon} name="user-1-minus" size={18} />
            )}
          </Flex>
          <div className={styles.userJob}>{data.jobName}</div>
        </Flex>
        {isSelected && <Icon name="checks" className={styles.checkIcon} />}
      </Flex>
    )
  }

  const tagRender = (option) => {
    const memberInfo = memberMap[option.value] ?? null

    return (
      <Flex
        className={classNames(styles.tag, { [styles.disabled]: otherProps.disabled })}
        align="center">
        {option?.isMaxTag ? (
          <UserAvatar className={styles.maxTag} size={28} icon={null}>
            {option?.label?.replaceAll(/[ .]/g, '')}
          </UserAvatar>
        ) : (
          <UserAvatar
            size={28}
            image={memberInfo?.image}
            defaultIcon={ItemIcon[memberInfo?.type]}
          />
        )}
      </Flex>
    )
  }

  const listToShow = useMemo(() => {
    return memberList.filter((item) => !exclude.includes(item.id))
  }, [exclude, memberList])

  return (
    <SelectSearch
      className={classNames(styles.selectBox, className)}
      classNames={{
        popup: {
          root: styles.popup,
        },
      }}
      loading={isLoading}
      options={listToShow}
      fieldNames={{ label: 'name', value: 'id' }}
      tagRender={tagRender}
      optionRender={optionRender as any}
      search={(input, option) =>
        normalizeText(`${String(option.name)} ${option.email}`.toLowerCase()).includes(
          normalizeText(input.toLowerCase()),
        )
      }
      allowClear
      size="large"
      mode="multiple"
      {...otherProps}
      labelInValue={false}
      useCustomValue={false}
    />
  )
}

export default Index
