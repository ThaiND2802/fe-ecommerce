import { Flex, Spin } from 'antd'
import cn from 'classnames'

import useLocale from '../../../../locales/useLocale'
import ExportSelect from '../../components/ExportSelect'

import Title from '../../components/Title'
import DataTable from './table'
import { useImportStep, useValidateImport } from './hooks'

import styles from '../style.module.less'
const Import = ({
  validateImportApiUrl,
  getImportDataApiUrl,
  importDataApiUrl,
  exportImportDataApiUrl,
  invisible,
}: {
  validateImportApiUrl: string
  getImportDataApiUrl: string
  importDataApiUrl: string
  exportImportDataApiUrl: string
  invisible?: boolean
}) => {
  const [t] = useLocale('Import')

  const { validateResult, isValidating } = useValidateImport({
    validateImportApiUrl,
    invisible,
  })

  useImportStep({ confirmImportApiUrl: importDataApiUrl })

  return (
    <div>
      <Title>{t.step.import}</Title>

      <div className={styles.description}>{t.import.description}</div>

      {isValidating ? (
        <Flex style={{ height: 100 }} justify="center" align="center">
          <Spin spinning />
        </Flex>
      ) : (
        <>
          <Flex style={{ marginTop: 16, marginBottom: 16 }}>
            <Flex flex={1} gap={10} align="start">
              <span className={styles.listLabel}>{t.import.label.list}</span>

              <div className={styles.tag}>
                {t.import.label.total}:{' '}
                <NumberValue value={validateResult?.total_count || 0} type="total" />
              </div>

              <div className={styles.tag}>
                {t.import.label.valid}:{' '}
                <NumberValue value={validateResult?.sucess_count || 0} type="valid" />
              </div>

              <div className={styles.tag}>
                {t.import.label.invalid}:{' '}
                <NumberValue value={validateResult?.error_count || 0} type="invalid" />
              </div>
            </Flex>

            <ExportSelect apiUrl={exportImportDataApiUrl} />
          </Flex>

          <DataTable getImportDataApiUrl={getImportDataApiUrl} invisible={invisible} />
        </>
      )}
    </div>
  )
}

const NumberValue = ({ value, type }: { value: number; type: 'total' | 'valid' | 'invalid' }) => {
  return <span className={cn(styles.numberValue, `tag-${type}`)}>{value}</span>
}

export default Import
