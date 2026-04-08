import { Avatar, AvatarProps } from 'antd'
import classNames from 'classnames'

import { UserIcon, UserGroupIcon, SystemGroupIcon } from './icon'

import styles from './index.module.less'

export enum DefaultIcon {
  USER = 'user',
  USER_GROUP = 'user-group',
  SYSTEM_GROUP = 'system-group',
  TENANT = 'tenant',
}

interface UserAvatarProps extends AvatarProps {
  image?: string
  name?: string
  iconSize?: number
  border?: boolean
  defaultIcon?: DefaultIcon
}

const isUrlRegex = /^(https:\/\/|http:\/\/|\/\/).+/

const IconMap = {
  [DefaultIcon.USER]: <UserIcon />,
  [DefaultIcon.USER_GROUP]: <UserGroupIcon />,
  [DefaultIcon.SYSTEM_GROUP]: <SystemGroupIcon />,
  [DefaultIcon.TENANT]: <SystemGroupIcon />,
}

const Index = ({
  className,
  image,
  name,
  size = 24,
  iconSize = 16,
  border = true,
  defaultIcon,
  ...otherProps
}: UserAvatarProps) => {
  const props: AvatarProps = {}
  let shortName = undefined

  if (image && isUrlRegex.test(image)) {
    props.src = image
  }

  if (name) {
    const nameWords = name.split(' ')
    const firstLetter = nameWords[0][0]
    const lastLetter = nameWords.at(-1)?.[0]
    shortName = `${firstLetter}${lastLetter}`
  }

  const defaultIconElement = IconMap[defaultIcon] ?? IconMap[DefaultIcon.USER]

  return (
    <Avatar
      className={classNames(styles.avatar, className, {
        [styles.border]: border,
      })}
      {...props}
      size={size}
      icon={defaultIconElement}
      {...otherProps}>
      {shortName || otherProps.children}
    </Avatar>
  )
}

export default Index
