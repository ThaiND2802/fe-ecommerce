import { useCallback, useMemo } from 'react'
import { Flex, Popover, Space } from 'antd'
import classNames from 'classnames'

import IconSax from '../../IconSax'
import Icon from '../../Icon'
import DraggableList from '../../DraggableList'
import Handler from '../../DraggableList/handler'
import UserAvatar, { DefaultIcon } from '../../UserAvatar'
import Empty from '../../Empty'
import { IUserAndGroupInfo, UserGroupType } from '../../../entities/user-management'
import { ActionIcon } from '../../ActionIcon'
import useLocale from '../../../locales/useLocale'
import { normalizeText } from '../../../utils/normalizeText'
import { textSearch } from '../../../utils/search'

import styles from './index.module.less'

interface IProps {
  noDrag?: boolean
  value?: IUserAndGroupInfo[]
  searchValue?: string
  selectMember?: boolean
  groupInfoRender?: (item: IUserAndGroupInfo) => React.ReactNode
  userInfoRender?: (item: IUserAndGroupInfo) => React.ReactNode
  onChange?: (MemberInfo: IUserAndGroupInfo[]) => void
  onRemove?: (item: IUserAndGroupInfo) => void
  onOpenGroup?: (item: IUserAndGroupInfo) => void
}

const ItemIcon = {
  [UserGroupType.USER_GROUP]: DefaultIcon.USER_GROUP,
  [UserGroupType.LINKED_GROUP]: DefaultIcon.SYSTEM_GROUP,
  [UserGroupType.USER]: DefaultIcon.USER,
  [UserGroupType.TENANT]: DefaultIcon.TENANT,
}

const Index = ({
  noDrag,
  value,
  searchValue,
  selectMember = true,
  groupInfoRender,
  userInfoRender,
  onChange,
  onOpenGroup,
  onRemove,
}: IProps) => {
  const [t, trans] = useLocale('UserGroupSelector')
  const deleteItem = useCallback(
    (item: IUserAndGroupInfo) => {
      onRemove?.(item)
      onChange?.(value?.filter(({ id }) => id !== item.id))
    },
    [onRemove, onChange, value],
  )

  const filteredValue = useMemo(() => {
    return value?.filter((item) => {
      const { name, job, email } = item
      const fullValue = normalizeText(`${name} ${job} ${email}`)
      return textSearch(fullValue, searchValue)
    })
  }, [value, searchValue])

  const renderExpiredInfo = (item: IUserAndGroupInfo) => {
    return (
      item.expired_count > 0 && (
        <>
          <span style={{ marginLeft: '4px' }}>(</span>
          <span className={styles.expiredCount}>
            {trans('UserGroupSelector.text.expired', { count: item.expired_count })}
          </span>
          <span>)</span>
        </>
      )
    )
  }

  const renderUserInfo = (item: IUserAndGroupInfo) => {
    return <div className={styles.userJob}>{item.job}</div>
  }

  const renderItem = useCallback(
    (item: IUserAndGroupInfo, preview?: boolean) => {
      if (item.item_type !== UserGroupType.USER) {
        return (
          <Flex className={classNames(styles.item, { [styles.preview]: preview })}>
            {!noDrag && <Handler className={styles.handler} iconSize={18} />}
            <UserAvatar
              className={styles.avatar}
              size={28}
              border={false}
              defaultIcon={ItemIcon[item.item_type]}
            />
            <Flex vertical className={styles.content}>
              <div className={styles.name}>{item.name}</div>
              <div className={styles.members}>
                {trans('UserGroupSelector.text.members', { count: item.member_count })}
                {groupInfoRender ? groupInfoRender(item) : renderExpiredInfo(item)}
              </div>
            </Flex>
            <Space className={styles.actions}>
              {selectMember && (
                <Popover
                  content={<div>{t.text.selectTooltip}</div>}
                  arrow={false}
                  placement="bottomRight">
                  <ActionIcon onClick={() => onOpenGroup?.(item)}>
                    <IconSax name="user-2-edit" size={18} />
                  </ActionIcon>
                </Popover>
              )}

              <ActionIcon red onClick={() => deleteItem(item)}>
                <Icon name="delete" size={18} />
              </ActionIcon>
            </Space>
          </Flex>
        )
      }
      return (
        <Flex className={classNames(styles.item, { [styles.preview]: preview })}>
          {!noDrag && <Handler className={styles.handler} iconSize={18} />}
          <UserAvatar
            className={styles.avatar}
            size={28}
            image={item?.image}
            defaultIcon={ItemIcon[item.item_type]}
            border={false}
          />
          <Flex vertical className={styles.content}>
            <div>
              <span className={styles.name}>{item.name}</span>
              <span> - </span>
              <span className={styles.email}>{item.email}</span>
            </div>
            {userInfoRender ? userInfoRender(item) : renderUserInfo(item)}
          </Flex>
          <Space className={styles.actions}>
            <ActionIcon red onClick={() => deleteItem(item)}>
              <Icon name="delete" size={18} />
            </ActionIcon>
          </Space>
        </Flex>
      )
    },
    [noDrag, selectMember, onOpenGroup, deleteItem, t, trans],
  )

  return (
    <>
      <DraggableList
        className={styles.list}
        datasource={filteredValue}
        gap={1}
        keyField="id"
        noHandler
        itemRender={renderItem}
        onChange={onChange}
        canDrag={noDrag ? () => false : undefined}
      />
      {!filteredValue?.length && <Empty message="" style={{ marginTop: 50 }} />}
    </>
  )
}

export default Index
