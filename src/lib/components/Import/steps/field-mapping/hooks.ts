import { useEffect, useEffectEvent, useMemo } from 'react'
import { FormInstance } from 'antd'
import { useQuery } from '@tanstack/react-query'

import { useFormWithI18nError } from '../../../../hooks/form'
import { importQueries } from '../../../../entities/import/queries'

import { useContextStore as useStore } from '../../context'
import { IMPORT_STEP } from '../../types'

export enum EFormField {
  Fields = 'fields',
  SystemField = 'systemField',
  ImportedField = 'importedField',
  FieldName = 'fieldName',
  Required = 'required',
  DataType = 'dataType',
}

export interface IFormValue {
  [EFormField.Fields]: {
    [EFormField.SystemField]: string
    [EFormField.ImportedField]: string
    [EFormField.FieldName]: string
    [EFormField.Required]: boolean
    [EFormField.DataType]: string
  }[]
}

export const useForm = ({
  getImportFieldsApiUrl,
  visible,
}: {
  getImportFieldsApiUrl: string
  visible?: boolean
}) => {
  const form = useFormWithI18nError()

  const entityName = useStore((state) => state.featureId)
  const sessionId = useStore((state) => state.sessionId)
  const sheetName = useStore((state) => state.sheetName)
  const headerIndex = useStore((state) => state.headerIndex)

  const { data: importFields, isFetching } = useQuery({
    ...importQueries.getImportFields({
      apiUrl: getImportFieldsApiUrl,
      params: {
        entity_key: entityName,
        session_id: sessionId,
        sheet_name: sheetName,
        header_index: headerIndex,
      },
    }),
    staleTime: Infinity,
    enabled: visible,
  })

  useEffect(() => {
    if (!importFields) return
    form.setFields([
      {
        name: EFormField.Fields,
        value: importFields.entity_fields?.map((field, index) => ({
          [EFormField.FieldName]: field.display_name,
          [EFormField.SystemField]: field.field_name,
          [EFormField.ImportedField]: importFields.excel_fields?.[index],
          [EFormField.Required]: field.is_required,
          [EFormField.DataType]: field.data_type,
        })),
      },
    ])
  }, [importFields])

  const excelFields = useMemo(() => {
    return importFields?.excel_fields?.map((field) => ({ label: field, value: field }))
  }, [importFields])

  return { form, isFetching, excelFields, entityFields: importFields?.entity_fields || [] }
}

export const useFieldMappingStep = (form: FormInstance<IFormValue>) => {
  const registerStepHandler = useStore((state) => state.registerStepHandler)
  const unregisterStepHandler = useStore((state) => state.unregisterStepHandler)
  const setFieldMapping = useStore((state) => state.setFieldMapping)

  const onNext = useEffectEvent(async () => {
    await form.validateFields()

    const fields = form.getFieldsValue()[EFormField.Fields]

    if (!fields || fields.length === 0) {
      return false
    }

    setFieldMapping(
      fields.map((field) => ({
        input_field: field[EFormField.SystemField],
        target_field: field[EFormField.ImportedField],
        is_required: field[EFormField.Required],
        data_type: field[EFormField.DataType],
      })),
    )

    return true
  })

  useEffect(() => {
    const handler = { onNext }

    registerStepHandler(IMPORT_STEP.FIELD_MAPPING, handler)

    return () => {
      unregisterStepHandler(IMPORT_STEP.FIELD_MAPPING)
    }
  }, [registerStepHandler, unregisterStepHandler])
}
