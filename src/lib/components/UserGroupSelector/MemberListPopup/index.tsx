import { useMemo, useState } from 'react'
import { Input } from 'antd'
import { useQuery } from '@tanstack/react-query'

import useLocale from '../../../locales/useLocale'
import { useDelayClosePopup } from '../../../hooks'
import Modal from '../../Modal'
import { IUserAndGroupInfo, userManagementQueries } from '../../../entities/user-management'
import IconSax from '../../IconSax'
import { normalizeText } from '../../../utils/normalizeText'

import UserGroupList from '../UserGroupList'

import styles from './index.module.less'

interface IProps {
  group: IUserAndGroupInfo
  onClose?: () => void
  onChange?: (list: IUserAndGroupInfo[]) => void
}

const Index = ({ group, onClose, onChange }: IProps) => {
  const [t] = useLocale('UserGroupSelector')
  const [searchString, setSearchString] = useState('')

  const { isVisible, isRender, close } = useDelayClosePopup({
    state: !!group,
    updateState: onClose,
  })

  const { data: memberList } = useQuery(userManagementQueries.getMemberByGroup(group?.id))

  const [removedList, setRemovedList] = useState<IUserAndGroupInfo[]>([])

  const selectedList = useMemo(() => {
    return (
      memberList?.filter((item) => !removedList.some((removed) => removed.id === item.id)) ?? []
    )
  }, [memberList, removedList])

  const filteredMemberList = useMemo(() => {
    return selectedList?.filter((item) => {
      const { name, job, email } = item
      const fullValue = normalizeText(`${name} ${job} ${email}`.toLowerCase())
      return fullValue.includes(normalizeText(searchString).toLowerCase())
    })
  }, [selectedList, searchString])

  if (!isRender) {
    return null
  }

  return (
    <Modal
      title={t.memberListPopup.title}
      open={isVisible}
      onCancel={close}
      onOk={() => {
        if (removedList.length) {
          onChange?.(selectedList)
        }
        close()
      }}
      style={{ height: '80vh', top: 'calc(20vh / 2)' }}>
      <div className={styles.search}>
        <Input
          placeholder={t.memberListPopup.placeholder.search}
          prefix={<IconSax name="search-normal-2" size={20} />}
          onChange={(e) => setSearchString(e.target.value)}
        />
      </div>
      <UserGroupList
        value={filteredMemberList}
        onRemove={(item) => {
          setRemovedList([...removedList, item])
        }}
        noDrag
      />
    </Modal>
  )
}

export default Index
