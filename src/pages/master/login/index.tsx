import { Button, Col, Form, Input, Row, Spin } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSignals } from '@preact/signals-react/runtime'

import AppLogo from 'src/assets/icons/logo.svg'
import { useLogin } from 'src/hook/use-login'
import useLocaleGroup from 'src/locales/useLocaleGroup'
import { PATH_TREE } from 'src/router/routes'

import styles from './index.module.less'

export interface ILoginForm {
  username: string
  password: string
}

const LoginPage = () => {
  useSignals()
  const [t] = useLocaleGroup('login')
  const navigator = useNavigate()
  const [loading, setLoading] = useState(false)
  const [loginForm] = Form.useForm()

  const { mutate: login } = useLogin({
    onSuccess: () => {
      const redirect = new URLSearchParams(window.location.search).get('route_url')

      if (redirect && decodeURIComponent(redirect) !== PATH_TREE.LOGIN) {
        navigator(decodeURIComponent(redirect))
      } else {
        navigator(PATH_TREE.HOME)
      }

      setLoading(false)
    },
    onError: () => {
      setLoading(false)
    },
  })

  const onFormFinish = async (values: ILoginForm) => {
    setLoading(true)
    login(values)
  }

  return (
    <Spin spinning={loading}>
      <Form
        className={styles.loginForm}
        layout="vertical"
        form={loginForm}
        onFinish={onFormFinish}
        autoComplete="off"
        style={{
          width: '100%',
          height: '100%',
        }}>
        <Row justify={'start'} align={'top'}>
          <Col span={24}>
            <div className={styles.logo}>
              <img src={AppLogo} alt="AppLogo" />
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              name="userName"
              label={t.label.username}
              rules={[
                {
                  required: true,
                  message: t.message.requiredUsername,
                },
              ]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              name="password"
              required
              label={t.label.password}
              rules={[
                {
                  required: true,
                  message: t.message.requiredPassword,
                },
              ]}>
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Button block htmlType="submit" type="primary">
              {t.button.login}
            </Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  )
}

export default LoginPage
