import { useEffectEvent, useEffect } from 'react'
import { Form, FormInstance } from 'antd'
import { useQuery } from '@tanstack/react-query'

import { importQueries } from '../../../../entities/import/queries'
import { FileLineItem } from '../../../../entities/files/types'
import { getDownloadImportTemplate } from '../../../../entities/import/api'
import useMessage from '../../../../hooks/message'
import useLocale from '../../../../locales/useLocale'

import { useContextStore as useStore } from '../../context'
import { IMPORT_STEP } from '../../types'

export enum EFormField {
  SourceFile = 'sourceFile',
  SheetName = 'sheetName',
  HeaderRow = 'headerRow',
}

export interface IFormValue {
  [EFormField.SourceFile]: FileLineItem[]
  [EFormField.SheetName]: string
  [EFormField.HeaderRow]: number
}

export const useForm = ({ uploadApiUrl }: { uploadApiUrl: string }) => {
  const [form] = Form.useForm<IFormValue>()

  const setSheets = useStore((state) => state.setSheets)
  const setSessionId = useStore((state) => state.setSessionId)

  const fileValue = Form.useWatch(EFormField.SourceFile, form)

  const { data: fileImportInfo, isFetching } = useQuery({
    ...importQueries.getFileSheets({ apiUrl: uploadApiUrl, file: fileValue?.[0] }),
  })

  useEffect(() => {
    form.setFieldsValue({
      [EFormField.SheetName]: undefined,
    })
  }, [fileValue?.[0]?.id])

  useEffect(() => {
    if (fileImportInfo) {
      setSheets(fileImportInfo.sheets)
      setSessionId(fileImportInfo.session_id)

      if (fileImportInfo.sheets?.length === 1) {
        form.setFieldsValue({
          [EFormField.SheetName]: fileImportInfo.sheets[0],
        })
      }
    } else {
      setSheets([])
    }
  }, [fileImportInfo])

  useEffect(() => {
    const fileValue = form.getFieldValue(EFormField.SourceFile)
    if (fileValue?.[0]) {
      form.setFieldsValue({
        [EFormField.SourceFile]: [
          {
            ...fileValue[0],
            uploading: isFetching,
          },
        ],
      })
    }
  }, [isFetching, form])

  return { form, isFetching, fileImportInfo }
}

export const useSelectFileStep = (form: FormInstance<IFormValue>) => {
  const registerStepHandler = useStore((state) => state.registerStepHandler)
  const unregisterStepHandler = useStore((state) => state.unregisterStepHandler)
  const setSheetName = useStore((state) => state.setSheetName)
  const setHeaderIndex = useStore((state) => state.setHeaderIndex)

  const onNext = useEffectEvent(async () => {
    await form.validateFields()

    setSheetName(form.getFieldValue(EFormField.SheetName))
    setHeaderIndex(form.getFieldValue(EFormField.HeaderRow))

    return true
  })

  useEffect(() => {
    const handler = { onNext, onClear: () => form.resetFields() }
    registerStepHandler(IMPORT_STEP.SELECT_FILE, handler)

    return () => {
      unregisterStepHandler(IMPORT_STEP.SELECT_FILE)
    }
  }, [registerStepHandler, unregisterStepHandler])
}

export const useTemplateDownloader = (apiUrl: string) => {
  const featureId = useStore((state) => state.featureId)
  const { message, apiFailed } = useMessage()
  const [c] = useLocale('common')

  return {
    download: async () => {
      try {
        message.open({
          type: 'loading',
          content: c.message.downloading,
          duration: 0,
        })
        const result = await getDownloadImportTemplate({ entity: featureId, apiUrl })

        const url = URL.createObjectURL(result.data)
        const a = document.createElement('a')
        a.href = url
        a.download = 'template.xlsx'
        a.click()

        URL.revokeObjectURL(url)
        message.destroy()
      } catch (error) {
        message.destroy()
        apiFailed()
        throw error
      }
    },
  }
}
