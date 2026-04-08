import { Select, SelectProps } from 'antd'

import { EExportType } from '../../../../entities/import'
import useLocale from '../../../../locales/useLocale'

import { useExportDownloader } from './hook'
import styles from './index.module.less'

interface IProps extends SelectProps {
  apiUrl: string
}

const Index = ({ apiUrl, ...props }: IProps) => {
  const { download } = useExportDownloader(apiUrl)
  const [t] = useLocale('Import')

  const handleExport = (exportType: EExportType) => {
    download(exportType)
  }

  return (
    <Select
      className={styles.exportSelect}
      placeholder={t.export.download}
      options={[
        { label: t.export.all, value: EExportType.ALL },
        { label: t.export.errorsOnly, value: EExportType.ERRORS_ONLY },
      ]}
      value={null}
      onSelect={handleExport}
      {...props}
    />
  )
}

export default Index
