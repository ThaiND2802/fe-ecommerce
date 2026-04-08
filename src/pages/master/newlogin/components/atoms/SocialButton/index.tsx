import type { ButtonHTMLAttributes, ReactNode } from 'react'

import styles from './index.module.less'
import classNames from 'classnames'

type SocialButtonProps = {
  icon: ReactNode
  label: string
  disabled?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const SocialButton = ({ icon, label, disabled = false, type = 'button', ...props }: SocialButtonProps) => {
  return (
    <button className={classNames(styles.button, { [styles.disabled]: disabled })} disabled={disabled} type={type} {...props}>
      <span className={styles.button__icon}>{icon}</span>
      <span className={styles.button__label}>{label}</span>
    </button>
  )
}

export default SocialButton
