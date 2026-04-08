import { CSSProperties, useMemo } from 'react'
import { Flex } from 'antd'
import classNames from 'classnames'

import { normalizeText } from '../../utils/normalizeText'
import SelectSearch, { SelectSearchProps } from '../SelectSearchCustomValue'
import Ellipsis from '../Ellipsis'
import UserAvatar from '../UserAvatar'
import IconSax from '../IconSax'
import { IStaffInfo } from '../../entities/user-management'

import styles from './index.module.less'

export interface MemberSelectProps extends SelectSearchProps<IStaffInfo> {
  options?: IStaffInfo[]
  exclude?: string[]
  isLoading?: boolean
  maxHeight?: number
}

const MemberSelect = ({
  className,
  options = [],
  exclude = [],
  isLoading = false,
  maxHeight,
  style,
  ...otherProps
}: MemberSelectProps) => {
  const memberList = options
  const memberMap: Record<string, IStaffInfo> = useMemo(() => {
    return (
      memberList.reduce((acc, item) => {
        acc[item.user_id] = item
        return acc
      }, {}) || {}
    )
  }, [memberList])

  const removeSelected = (memberInfo: IStaffInfo, value: string) => {
    if (Array.isArray(otherProps.value)) {
      const newList = otherProps.value?.filter(
        (id) => typeof id === 'string' && id !== (memberInfo?.user_id || value),
      )
      otherProps.onChange?.(newList)
    }
  }

  const labelRender = (option) => {
    const staffEmail = memberMap[option.value]?.email
    return (
      <span className="ant-select-selection-item-content">
        {option.label}
        {staffEmail ? ` - ${staffEmail}` : ''}
      </span>
    )
  }

  const optionRender = ({ data }: { data: IStaffInfo }) => {
    return (
      <Flex align="center" gap={8}>
        <UserAvatar size={28} image={data.image} />
        <Ellipsis
          style={{
            flex: 1,
          }}>{`${data.full_name}${data.email ? ' - ' + data.email : ''}`}</Ellipsis>
      </Flex>
    )
  }

  const tagRender = (option) => {
    const memberInfo = memberMap[option.value]
    return (
      <Flex
        className={classNames(styles.tag, { [styles.disabled]: otherProps.disabled })}
        align="center"
        gap={8}>
        <UserAvatar size={28} image={memberInfo?.image} />
        <Flex className={styles.tagInfo}>
          <Ellipsis className={styles.userName}>{memberInfo?.full_name}</Ellipsis>
          <Ellipsis className={styles.subTitle}>{memberInfo?.email}</Ellipsis>
        </Flex>
        {!otherProps.disabled && (
          <IconSax
            className={styles.closeIcon}
            name="x"
            size={16}
            onMouseDown={(e) => {
              e.stopPropagation()
            }}
            onClick={() => {
              removeSelected(memberInfo, option.value)
            }}
          />
        )}
      </Flex>
    )
  }

  const listToShow = useMemo(() => {
    return memberList.filter((item) => !exclude.includes(item.user_id))
  }, [exclude, memberList])

  return (
    <SelectSearch
      className={classNames(styles.selectBox, className)}
      loading={isLoading}
      options={listToShow}
      fieldNames={{ label: 'full_name', value: 'user_id' }}
      labelRender={labelRender}
      tagRender={tagRender}
      optionRender={optionRender as any}
      search={(input, option) =>
        normalizeText(`${String(option.full_name)} ${option.email}`.toLowerCase()).includes(
          normalizeText(input.toLowerCase()),
        )
      }
      allowClear
      style={
        {
          '--member-select-max-height': maxHeight ? `${maxHeight}px` : 'none',
          ...style,
        } as CSSProperties
      }
      {...otherProps}
    />
  )
}

export default MemberSelect
