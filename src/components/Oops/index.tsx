import Icon from '@ant-design/icons'

import AccessDenied from 'src/components/SvgIcons/access-denied'
import useLocaleGroup from 'src/locales/useLocaleGroup'

import styles from './index.module.less'

interface OopsProps {
  message?: string
  fullHeight?: boolean
  noAccess?: boolean
}

const Oops = ({ message, fullHeight = false, noAccess }: OopsProps) => {
  const [t] = useLocaleGroup('common')

  return (
    <div className={styles.oops} style={{ height: fullHeight ? '100%' : 'auto' }}>
      <Icon component={AccessDenied} />
      {message && <span className={styles.message}>{message}</span>}
      {noAccess && <span className={styles.message}>{t.message.noAccess}</span>}
    </div>
  )
}

export default Oops
