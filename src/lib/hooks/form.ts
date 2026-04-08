import { useEffect } from 'react'
import { Form, FormInstance } from 'antd'

import i18n from '../locales/i18n'

export const useFormErrorI18nUpdate = (form: FormInstance) => {
  const updateFormError = () => {
    const hasErrors = form.getFieldsError().some((field) => field.errors.length > 0)
    if (hasErrors) {
      setTimeout(() => {
        form.validateFields().catch(() => {})
      }, 1)
    }
  }
  useEffect(() => {
    i18n.on('languageChanged', updateFormError)
  }, [])
}

export const useFormWithI18nError = () => {
  const [form] = Form.useForm()
  useFormErrorI18nUpdate(form)
  return form
}
