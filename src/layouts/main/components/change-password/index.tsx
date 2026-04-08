import React, { useEffect } from 'react'
import { Form, message, Button, Input } from 'antd'

import useLocaleGroup from 'src/locales/useLocaleGroup'
import Modal from 'src/components/Modal'
import { usePassword } from 'src/hook/use-password'

import styles from './index.module.less'

interface ChangePasswordProps {
  open: boolean
  onClose: () => void
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ open, onClose }: ChangePasswordProps) => {
  const [t] = useLocaleGroup('changePassword')
  const [form] = Form.useForm()

  const { mutate: changePassword, isPending } = usePassword({
    onSuccess: () => {
      message.success(t.message.changePasswordSuccess)
      onClose()
    },
    onError: () => {
      message.error(t.message.changePasswordFail)
    },
  })

  useEffect(() => {
    form.resetFields()
  }, [open])

  const handleChangePassword = (values) => {
    changePassword(values)
  }

  const handleSubmit = () => {
    form
      .validateFields()
      .then(handleChangePassword)
      .catch((error) => {
        console.log(error)
      })
  }

  const closeForm = () => {
    form.resetFields()
    onClose()
  }

  return (
    <Modal
      title={t.title}
      open={open}
      width={500}
      onCancel={onClose}
      style={{ maxHeight: '400px' }}
      footer={false}
      actions={[
        <Button key="cancel" onClick={closeForm} loading={isPending}>
          {t.button.cancel}
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit} loading={isPending}>
          {t.button.save}
        </Button>,
      ]}>
      <Form className={styles.form} layout="vertical" form={form}>
        <Form.Item
          name="oldPassword"
          label={t.label.oldPassword}
          rules={[
            {
              required: true,
              message: t.message.requiredField,
            },
          ]}>
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label={t.label.newPassword}
          rules={[
            { required: true, message: t.message.requiredField },
            {
              min: 8,
              message: t.message.requiredLength,
            },
          ]}>
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label={t.label.confirmPassword}
          rules={[
            { required: true, message: t.message.requiredField },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error(t.message.passwordMismatch))
              },
              validateTrigger: ['onSubmit'],
            }),
          ]}>
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ChangePassword
