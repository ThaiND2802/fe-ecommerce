import styles from './index.module.less'

const Dot = ({ size = 8, color = '#000' }: { size?: number; color?: string }) => {
  return <i className={styles.dot} style={{ width: size, height: size, backgroundColor: color }} />
}

export default Dot
