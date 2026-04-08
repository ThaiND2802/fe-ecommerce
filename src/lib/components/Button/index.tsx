import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd'
import classNames from 'classnames'

import styles from './index.module.less'

export interface IButtonProps extends AntButtonProps {
  selected?: boolean
  bold?: boolean
}

const Button = ({ className, onClick, selected, bold, ...props }: IButtonProps) => {
  return (
    <AntButton
      className={classNames(styles.button, className, {
        [styles.selected]: selected,
        [styles.bold]: bold,
      })}
      onClick={onClick}
      {...props}
    />
  )
}

export default Button
