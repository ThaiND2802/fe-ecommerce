import React, { useImperativeHandle, useState } from 'react'
import { Button, Flex, Modal, Space, theme } from 'antd'
import classNames from 'classnames'

import IconSax from '../IconSax'
import useLocale from '../../locales/useLocale'
import { useDelayClosePopup } from '../../hooks'
import styles from './index.module.less'

interface IProps {
  ref?: React.Ref<ConfirmationRef>
  content?: React.ReactNode
  contentDelete?: string
  visible?: boolean
  loading?: boolean
  disabled?: boolean
  noIcon?: boolean
  onConfirmed?: () => void
  onCancel?: () => void
}

export interface ConfirmationRef {
  open: () => void
  close: () => void
  cancel: () => void
}

const Confirmation = ({
  content,
  contentDelete,
  visible,
  onConfirmed,
  onCancel,
  loading,
  disabled,
  noIcon = false,
  ref,
}: IProps) => {
  const [t, trans] = useLocale('Confirmation')
  const [c] = useLocale('button')
  const { token } = theme.useToken()

  const [popupVisible, setPopupVisible] = useState(visible || false)

  const { isVisible, isRender, close } = useDelayClosePopup({
    state: popupVisible,
    updateState: setPopupVisible,
  })

  const cancel = () => {
    close()
    onCancel?.()
  }

  const confirm = () => {
    onConfirmed?.()
  }

  useImperativeHandle(ref, () => ({
    open: () => {
      setPopupVisible(true)
    },
    close,
    cancel,
  }))

  if (!isRender) return null

  let message = content || ''
  if (!message && contentDelete) {
    message = trans(t.deleteQuestion, { entry: contentDelete })
  }

  return (
    <Modal open={isVisible} title={null} footer={null} onCancel={cancel} width={400}>
      <Flex className={classNames(styles.body, { [styles.noIcon]: noIcon })}>
        {!noIcon && (
          <Flex className={styles.iconOuter} style={{ background: token.colorErrorBg }}>
            <IconSax name="warning-triangle" className={styles.icon} size={30} />
          </Flex>
        )}
        <div className={styles.content}>{message}</div>
        {!noIcon && <div className={styles.warning}>{t.undoneWarning}</div>}
        <Space>
          <Button size="large" onClick={cancel} loading={loading} disabled={disabled}>
            {c.cancel}
          </Button>
          <Button
            size="large"
            type="primary"
            danger
            onClick={confirm}
            loading={loading}
            disabled={disabled}>
            {c.confirm}
          </Button>
        </Space>
      </Flex>
    </Modal>
  )
}

export default Confirmation
