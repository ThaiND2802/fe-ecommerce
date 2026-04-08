import { useMemo } from 'react'
import { Form } from 'antd'
import { useQueries } from '@tanstack/react-query'

import { IUserAndGroupInfo, userManagementQueries } from '../../../entities/user-management'
import { UserGroupType } from 'src/lib/entities/user-management/types'

export enum FormFields {
  TenantId = 'tenantId',
  MemberSelector = 'memberSelector',
  SelectedMembers = 'selectedMembers',
}

export interface FormValues {
  [FormFields.TenantId]: string
  [FormFields.MemberSelector]: IUserAndGroupInfo[]
  [FormFields.SelectedMembers]: IUserAndGroupInfo[]
}

export const useFormHandler = ({
  autoUngroup,
  onChange,
}: {
  autoUngroup?: boolean
  onChange?: (value: IUserAndGroupInfo[]) => void
}) => {
  const [form] = Form.useForm<FormValues>()

  const tenantId = Form.useWatch(FormFields.TenantId, form)
  const selectedMembers = Form.useWatch(FormFields.SelectedMembers, form) ?? []
  const selectedMemberIds = useMemo(() => {
    return selectedMembers?.map((item) => item.id)
  }, [selectedMembers])
  const selectedGroupIds = useMemo(() => {
    if (!autoUngroup) {
      return []
    }
    return selectedMembers
      ?.filter((item) => item.item_type !== UserGroupType.USER)
      ?.map((item) => item.id)
  }, [selectedMembers, autoUngroup])

  const groupMemberQueries = useQueries({
    queries: userManagementQueries.getMemberByGroupIds(selectedGroupIds, autoUngroup),
  })
  const groupMemberQueriesLoading = groupMemberQueries.some((query) => query.isLoading)

  const handleSave = () => {
    if (autoUngroup) {
      const members = selectedMembers.filter((item) => item.item_type === UserGroupType.USER)
      const groupMembers = groupMemberQueries.flatMap((query) => query.data).flat()
      const mergedMembers = [...members, ...groupMembers].filter(
        (item, index, self) => index === self.findIndex((t) => t.id === item.id),
      )
      onChange?.(mergedMembers ?? [])
    } else {
      onChange?.(selectedMembers ?? [])
    }
  }

  const add = () => {
    const selectingItems: IUserAndGroupInfo[] = form.getFieldValue(FormFields.MemberSelector)

    if (!selectingItems?.length) {
      return
    }

    const currentItems = form.getFieldValue(FormFields.SelectedMembers) ?? []

    form.setFields([
      {
        name: FormFields.MemberSelector,
        value: [],
      },
      {
        name: FormFields.SelectedMembers,
        value: [...currentItems, ...selectingItems],
      },
    ])
  }

  const changeGroupToMemberList = (group: IUserAndGroupInfo, list: IUserAndGroupInfo[]) => {
    const noGroupList = selectedMembers.filter((item) => item.id !== group.id)
    const itemMap = new Map(noGroupList.map((item) => [item.id, item]))
    const newItems = []

    list.forEach((item) => {
      if (!itemMap.has(item.id)) {
        newItems.push(item)
      }
    })

    form.setFields([
      {
        name: FormFields.SelectedMembers,
        value: [...noGroupList, ...newItems],
      },
    ])
  }

  return {
    form,
    tenantId,
    selectedMemberIds,
    isLoading: groupMemberQueriesLoading,
    handleSave,
    add,
    changeGroupToMemberList,
  }
}
