import { Link, LinkProps } from 'react-router-dom'

import styles from './index.module.less'

const Index = ({ ...props }: LinkProps) => {
  return <Link className={styles.navLink} {...props} />
}

export default Index
