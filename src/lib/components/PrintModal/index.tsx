import classNames from 'classnames'

import Modal, { IModalProps as ModalProps } from 'src/lib/components/Modal'
import IconSax from 'src/lib/components/IconSax'
import useLocale from 'src/lib/locales/useLocale'

import styles from './index.module.less'

export interface IModalProps extends ModalProps {}

const Index = ({ className, title, ...otherProps }: IModalProps) => {
  const [b] = useLocale('PrintModal')

  return (
    <Modal
      title={
        <>
          <IconSax name="printer" size={18} /> {title}
        </>
      }
      className={classNames(className, styles.modal)}
      okText={
        <>
          <IconSax name="printer" size={18} /> {b.print}
        </>
      }
      width={'calc(100vw - 50px)'}
      style={{ height: 'calc(100vh - 50px)', top: '25px' }}
      destroyOnHidden
      {...otherProps}
    />
  )
}

export default Index
