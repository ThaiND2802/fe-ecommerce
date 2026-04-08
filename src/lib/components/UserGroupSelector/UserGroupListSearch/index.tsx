import { useState } from 'react'
import { Flex } from 'antd'

import { IUserAndGroupInfo } from '../../../entities/user-management'
import useLocale from '../../../locales/useLocale'

import UserGroupList from '../UserGroupList'
import SearchPopover from '../SearchPopover'

import styles from './index.module.less'

interface IProps {
  value?: IUserAndGroupInfo[]
  draggable?: boolean
  subTitle?: React.ReactNode
  groupInfoRender?: (item: IUserAndGroupInfo) => React.ReactNode
  userInfoRender?: (item: IUserAndGroupInfo) => React.ReactNode
  onChange?: (MemberInfo: IUserAndGroupInfo[]) => void
  onOpenGroup?: (item: IUserAndGroupInfo) => void
}

const Index = ({
  value,
  draggable = true,
  subTitle,
  groupInfoRender,
  userInfoRender,
  onChange,
  onOpenGroup,
}: IProps) => {
  const [t] = useLocale('UserGroupSelector')

  const [searchValue, setSearchValue] = useState('')

  return (
    <Flex vertical gap={10}>
      <Flex className={styles.header}>
        <div className={styles.label}>{t.label.userList}</div>
        <SearchPopover
          searchValue={searchValue}
          inputProps={{
            value: searchValue,
            onChange: (e) => setSearchValue(e.target.value),
          }}
        />
      </Flex>
      {subTitle}
      <UserGroupList
        value={value}
        onChange={onChange}
        onOpenGroup={onOpenGroup}
        searchValue={searchValue}
        noDrag={!draggable}
        groupInfoRender={groupInfoRender}
        userInfoRender={userInfoRender}
      />
    </Flex>
  )
}

export default Index
