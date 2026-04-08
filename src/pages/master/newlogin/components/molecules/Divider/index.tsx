import styles from './index.module.less'

type DividerProps = {
  label: string
}

const Divider = ({ label }: DividerProps) => {
  return (
    <div className={styles.divider} aria-hidden="true">
      <span className={styles.divider__line} />
      <span className={styles.divider__label}>{label}</span>
      <span className={styles.divider__line} />
    </div>
  )
}

export default Divider
