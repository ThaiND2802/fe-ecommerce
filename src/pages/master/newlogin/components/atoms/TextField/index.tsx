import type { InputHTMLAttributes } from 'react'

import styles from './index.module.less'

type TextFieldProps = {
  label: string
  id: string
  icon: 'email' | 'password'
} & InputHTMLAttributes<HTMLInputElement>

const ICONS = {
  email: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.field__iconSvg}>
      <path d="M3 6.75A2.75 2.75 0 0 1 5.75 4h12.5A2.75 2.75 0 0 1 21 6.75v10.5A2.75 2.75 0 0 1 18.25 20H5.75A2.75 2.75 0 0 1 3 17.25V6.75Zm2.18-.25 6.31 5.25a.8.8 0 0 0 1.02 0l6.31-5.25H5.18Zm14.32 1.3-5.98 4.97a2.8 2.8 0 0 1-3.58 0L4.5 7.8v9.45c0 .69.56 1.25 1.25 1.25h12.5c.69 0 1.25-.56 1.25-1.25V7.8Z" />
    </svg>
  ),
  password: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.field__iconSvg}>
      <path d="M12 2a5 5 0 0 1 5 5v2h.5A2.5 2.5 0 0 1 20 11.5v8A2.5 2.5 0 0 1 17.5 22h-11A2.5 2.5 0 0 1 4 19.5v-8A2.5 2.5 0 0 1 6.5 9H7V7a5 5 0 0 1 5-5Zm5.5 9h-11a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5ZM12 4a3 3 0 0 0-3 3v2h6V7a3 3 0 0 0-3-3Z" />
    </svg>
  ),
} as const

const TextField = ({ label, id, icon, type = 'text', ...props }: TextFieldProps) => {
  return (
    <label className={styles.field} htmlFor={id}>
      <span className={styles.field__icon}>{ICONS[icon]}</span>
      <input id={id} className={styles.field__input} type={type} placeholder={label} {...props} />
    </label>
  )
}

export default TextField
