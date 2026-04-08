import { useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'

import { importQueries } from '../../../../entities/import'
import useTable from '../../../Table/useTable'
import Ellipsis from '../../../Ellipsis'
import useLocale from '../../../../locales/useLocale'
import { confirmImport } from '../../../../entities/import/api'
import { destroyNotify, notify } from '../../../NotificationHandler'

import { useContextStore as useStore } from '../../context'
import { IMPORT_STEP } from '../../types'

import styles from '../style.module.less'

export const useValidateImport = ({
  validateImportApiUrl,
  invisible,
}: {
  validateImportApiUrl: string
  invisible?: boolean
}) => {
  const sessionId = useStore((state) => state.sessionId)
  const fieldMapping = useStore((state) => state.fieldMapping)
  const importOptions = useStore((state) => state.importOptions)
  const setValidateResult = useStore((state) => state.setValidateResult)
  const [t] = useLocale('Import')

  const { data: validateImportData, isFetching: isValidating } = useQuery({
    ...importQueries.getValidateImportData({
      apiUrl: validateImportApiUrl,
      params: {
        session_id: sessionId,
        field_map: fieldMapping,
        mode: importOptions.importType,
        save_option: {
          replace_exist_data: importOptions.emptyData,
          auto_fill_miss_language: importOptions.defaultLanguage,
        },
      },
    }),
    enabled: !invisible,
  })

  useEffect(() => {
    if (isValidating) {
      setValidateResult(undefined)
      notify({
        message: t.import.message.validating,
        type: 'loading',
        duration: 0,
        key: 'validate-import-data',
      })
    } else {
      setValidateResult(validateImportData)
      destroyNotify('validate-import-data')
    }
  }, [validateImportData, isValidating])

  return {
    isValidating,
    validateResult: validateImportData,
  }
}

interface ITableData {
  [key: string]: string
}

export const useTableData = ({
  getImportDataApiUrl,
  invisible,
}: {
  getImportDataApiUrl: string
  invisible?: boolean
}) => {
  const [t] = useLocale('Import')
  const sessionId = useStore((state) => state.sessionId)
  const { datasource, tableParams, handleTableChange, setDatasource, setTableParams } =
    useTable<ITableData>()

  const { data: importData, isFetching } = useQuery({
    ...importQueries.getImportData({
      apiUrl: getImportDataApiUrl,
      params: {
        session_id: sessionId,
        page_index: tableParams.pagination.current - 1,
        page_size: tableParams.pagination.pageSize,
      },
    }),
    enabled: !invisible,
  })

  const columns = useMemo(() => {
    const columnFields = importData?.column_info?.[0]
    const languageFields = importData?.column_info?.[1]

    if (!columnFields) return []

    return Object.entries(columnFields).map(([key, value]) => ({
      title: languageFields?.[key] ? `${value} (${languageFields?.[key]})` : value,
      dataIndex: key,
      key: key,
      ...(key === 'is_valid'
        ? {
            render: (isValid: boolean) =>
              isValid ? (
                <span className={styles.validRecord}>{t.import.label.valid}</span>
              ) : (
                <span>{t.import.label.invalid}</span>
              ),
            width: 150,
          }
        : {}),
      ...(key === 'error_message'
        ? { render: (text: string) => <Ellipsis line={3}>{text}</Ellipsis>, width: 400 }
        : {}),
    }))
  }, [importData])

  const onRow = (record: ITableData, index: number) => {
    return {
      className: record.is_valid ? '' : 'invalid-row',
    }
  }

  useEffect(() => {
    if (importData) {
      setDatasource(importData.data_list)
      setTableParams({
        pagination: {
          ...tableParams.pagination,
          total: importData.pagination?.total_rows,
        },
      })
    }
  }, [importData, tableParams.pagination.current, tableParams.pagination.pageSize])

  return { columns, datasource, tableParams, isLoading: isFetching, handleTableChange, onRow }
}

export const useImportStep = ({ confirmImportApiUrl }: { confirmImportApiUrl: string }) => {
  const registerStepHandler = useStore((state) => state.registerStepHandler)
  const unregisterStepHandler = useStore((state) => state.unregisterStepHandler)
  const sessionId = useStore((state) => state.sessionId)
  const setIsSubmittingImport = useStore((state) => state.setIsSubmittingImport)
  const reset = useStore((state) => state.reset)
  const validateResult = useStore((state) => state.validateResult)

  const [t] = useLocale('Import')

  useEffect(() => {
    const handler = {
      onNext: async () => {
        if (!validateResult) return

        setIsSubmittingImport(true)
        const result = await confirmImport({
          apiUrl: confirmImportApiUrl,
          data: { session_id: sessionId },
        }).catch(() => null)

        setIsSubmittingImport(false)

        if (result) {
          notify({
            message: t.import.message.success,
            type: 'success',
          })
          reset()
        } else {
          notify({
            message: t.import.message.error,
            type: 'error',
          })
        }

        return !!result
      },
    }

    registerStepHandler(IMPORT_STEP.IMPORT, handler)

    return () => {
      unregisterStepHandler(IMPORT_STEP.IMPORT)
    }
  }, [registerStepHandler, unregisterStepHandler, sessionId, validateResult])
}
