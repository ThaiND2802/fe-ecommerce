import React from 'react'
import { Modal as AntModal, ModalProps, Space } from 'antd'
import classNames from 'classnames'

import styles from './index.module.less'

interface IProps extends ModalProps {
  actions?: React.ReactNode[]
  noTitle?: boolean
}

const Modal: React.FC<IProps> = ({ className, noTitle, actions, children, ...otherProps }) => {
  return (
    <AntModal
      className={classNames(className, styles.component, noTitle && styles.noTitle)}
      {...otherProps}>
      <div className={styles.body}>{children}</div>
      {!!actions?.length && <Space className={styles.actions}>{actions.map((comp) => comp)}</Space>}
    </AntModal>
  )
}

export default Modal
