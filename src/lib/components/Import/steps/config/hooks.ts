import { useEffect } from 'react'
import { Form, FormInstance } from 'antd'

import { EImportType } from '../../../../entities/import/types'
import { useContextStore as useStore } from '../../context'
import { IMPORT_STEP } from '../../types'

export enum EFormField {
  ImportType = 'importType',
  EmptyData = 'emptyData',
  DefaultLanguage = 'defaultLanguage',
}

export interface IFormValue {
  [EFormField.ImportType]: EImportType
  [EFormField.EmptyData]: boolean
  [EFormField.DefaultLanguage]: boolean
}

export const useForm = () => {
  const [form] = Form.useForm()
  return form
}

export const useConfigStep = (form: FormInstance<IFormValue>) => {
  const registerStepHandler = useStore((state) => state.registerStepHandler)
  const unregisterStepHandler = useStore((state) => state.unregisterStepHandler)
  const setImportOptions = useStore((state) => state.setImportOptions)

  useEffect(() => {
    const handler = {
      onNext: async () => {
        setImportOptions(form.getFieldsValue())
        return true
      },
      onClear: () => form.resetFields(),
    }

    registerStepHandler(IMPORT_STEP.CONFIGURATION, handler)

    return () => {
      unregisterStepHandler(IMPORT_STEP.CONFIGURATION)
    }
  }, [registerStepHandler, unregisterStepHandler])
}
