import { useEffect, useState } from 'react'
import { Form, Flex, Button } from 'antd'

import { DrawerWithScroll, DrawerProps } from '../../Drawer'
import FormItemIcon from '../../FormItemIcon'
import IconSax from '../../IconSax'
import { ButtonSave } from '../../Buttons'
import useLocale from '../../../locales/useLocale'
import { IUserAndGroupInfo } from '../../../entities/user-management'

import CompanySelect from '../CompanySelect'
import MemberGroupSelect from '../MemberGroupSelect'
import UserGroupListSearch from '../UserGroupListSearch'
import MemberListPopup from '../MemberListPopup'
import { useFormHandler, FormFields } from './hooks'

import styles from './index.module.less'

interface SelectorPopupProps extends DrawerProps {
  isShare?: boolean
  value?: IUserAndGroupInfo[]
  autoUngroup?: boolean
  onChange?: (value: IUserAndGroupInfo[]) => void
}

const Index = ({
  isShare,
  value,
  autoUngroup,
  onChange,
  onClose,
  ...otherProps
}: SelectorPopupProps) => {
  const [t] = useLocale('UserGroupSelector')
  const { form, tenantId, selectedMemberIds, isLoading, handleSave, add, changeGroupToMemberList } =
    useFormHandler({
      autoUngroup,
      onChange,
    })
  const [group, setGroup] = useState<IUserAndGroupInfo>()

  const openMemberListPopup = (group: IUserAndGroupInfo) => {
    setGroup(group)
  }

  const closeMemberListPopup = () => {
    setGroup(undefined)
  }

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    onClose?.(e)
    form.setFields([{ name: FormFields.SelectedMembers, value }])
  }

  useEffect(() => {
    form.setFields([
      {
        name: FormFields.SelectedMembers,
        value: value || [],
      },
    ])
  }, [value])

  return (
    <DrawerWithScroll
      title={t.title}
      width={700}
      extra={<ButtonSave onClick={handleSave} loading={isLoading} />}
      onClose={handleClose}
      {...otherProps}>
      <Form className={styles.form} form={form}>
        <FormItemIcon
          iconClassName={styles.tenantSelectIcon}
          icon={<IconSax name="building-1" />}
          name={FormFields.TenantId}>
          <CompanySelect
            isShare={isShare}
            placeholder={t.placeholder.company}
            onDataChange={(data) => {
              if (data?.length == 1) {
                form.setFields([
                  {
                    name: FormFields.TenantId,
                    value: data[0].company_code,
                  },
                ])
              }
            }}
          />
        </FormItemIcon>
        <Flex style={{ width: '100%' }} gap={10}>
          <FormItemIcon
            className={styles.memberSelect}
            iconClassName={styles.memberSelectIcon}
            icon={<IconSax name="user-1-add" />}
            name={FormFields.MemberSelector}>
            <MemberGroupSelect
              placeholder={t.placeholder.user}
              searchPlaceholder={t.placeholder.search}
              isShare={isShare}
              tenantId={tenantId}
              maxTagCount={5}
              exclude={selectedMemberIds}
            />
          </FormItemIcon>
          <Button className={styles.addBtn} size="large" onClick={add}>
            {t.button.add}
          </Button>
        </Flex>
        <FormItemIcon
          icon={<IconSax name="text-align-justify-center" />}
          name={FormFields.SelectedMembers}>
          <UserGroupListSearch onOpenGroup={openMemberListPopup} />
        </FormItemIcon>
      </Form>
      <MemberListPopup
        key={group?.id}
        group={group}
        onClose={closeMemberListPopup}
        onChange={(list) => {
          changeGroupToMemberList(group, list)
        }}
      />
    </DrawerWithScroll>
  )
}

export default Index
