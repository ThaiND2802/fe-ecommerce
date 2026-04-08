import classNames from 'classnames'
import { Button, ButtonProps } from 'antd'

import IconSax from '../IconSax'
import Icon from '../Icon'
import useLocale from '../../locales/useLocale'

import styles from './index.module.less'

interface ActionIconProps extends ButtonProps {
  iconSize?: number
  red?: boolean
  noBackground?: boolean
  noPadding?: boolean
}

export const ActionIcon = ({
  className,
  children,
  red,
  noBackground,
  noPadding,
  ...otherProps
}: ActionIconProps) => {
  return (
    <Button
      type="text"
      className={classNames(className, styles.icon, {
        [styles.red]: red,
        [styles.noBackground]: noBackground,
        [styles.noPadding]: noPadding,
        [styles.disabled]: otherProps.disabled,
      })}
      {...otherProps}>
      {children}
    </Button>
  )
}

export const EditIcon = ({ iconSize = 18, ...props }: ActionIconProps) => {
  const [c] = useLocale('common')
  return (
    <ActionIcon title={c.text.edit} {...props}>
      <IconSax name="edit-1" size={iconSize} />
    </ActionIcon>
  )
}

export const DeleteIcon = ({ iconSize = 18, ...props }: ActionIconProps) => {
  const [c] = useLocale('common')
  return (
    <ActionIcon title={c.text.delete} {...props}>
      <Icon name="delete" size={iconSize} />
    </ActionIcon>
  )
}

export const MoreIcon = ({ iconSize = 18, ...props }: ActionIconProps) => (
  <ActionIcon className={styles.moreIcon} {...props}>
    <Icon name="menu" size={iconSize} />
  </ActionIcon>
)
