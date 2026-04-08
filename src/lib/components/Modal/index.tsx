import { Modal, ModalProps } from 'antd'
import SimpleBar from 'simplebar-react'
import classNames from 'classnames'

import useLocale from 'src/lib/locales/useLocale'

import styles from './index.module.less'

export interface IModalProps extends ModalProps {}

const Index = ({ children, className, ...otherProps }: IModalProps) => {
  const [b] = useLocale('Modal')
  return (
    <Modal
      className={classNames(className, styles.modal)}
      okText={b.ok}
      cancelText={b.cancel}
      {...otherProps}>
      <div className={styles.body}>{children}</div>
    </Modal>
  )
}

const ModalWithScroll = ({ children, className, ...otherProps }: IModalProps) => {
  return (
    <Index className={classNames(className, styles.modalWithScroll)} {...otherProps}>
      <SimpleBar style={{ maxHeight: '100%' }}>{children}</SimpleBar>
    </Index>
  )
}

export default Index
export { ModalWithScroll }
