import { App as AntdApp, ConfigProvider } from 'antd'
import '@ant-design/v5-patch-for-react-19'
import { I18nextProvider } from 'react-i18next'
import React from 'react'

import GlobalEventHandler from './global'
import i18n from './locales/i18n'
import './locales/dayjs'
import QueryProvider from './query'
import ModuleRouter from './router'

const MyModule = () => {
  const isDevelopment = process.env.NODE_ENV === 'development'
  const AppWrapper = isDevelopment ? React.StrictMode : React.Fragment

  return (
    <AppWrapper>
      <QueryProvider>
        <I18nextProvider i18n={i18n}>
          <ConfigProvider theme={globalThis?.moduleConfig?.theme}>
            <AntdApp style={{ height: '100%' }}>
              <ModuleRouter />
              <GlobalEventHandler />
            </AntdApp>
          </ConfigProvider>
        </I18nextProvider>
      </QueryProvider>
    </AppWrapper>
  )
}

export default MyModule
