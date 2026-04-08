import { App } from 'antd'

import useLocale from '../locales/useLocale'

const useMessage = () => {
  const { message } = App.useApp()
  const [t] = useLocale('common')

  return {
    message,
    saveSuccess: () => {
      message.success(t.message.saveSuccess)
    },
    sendSuccess: () => {
      message.success(t.message.sendSuccess)
    },
    saveFail: () => {
      message.error(t.message.saveFail)
    },
    createSuccess: () => {
      message.success(t.message.createSuccess)
    },
    createFail: () => {
      message.error(t.message.createFail)
    },
    updateSuccess: () => {
      message.success(t.message.updateSuccess)
    },
    updateFail: () => {
      message.error(t.message.updateFail)
    },
    deleteSuccess: () => {
      message.success(t.message.deleteSuccess)
    },
    deleteFail: () => {
      message.error(t.message.deleteFail)
    },
    apiFailed: () => {
      message.error(t.message.apiFailed)
    },
  }
}

export default useMessage
