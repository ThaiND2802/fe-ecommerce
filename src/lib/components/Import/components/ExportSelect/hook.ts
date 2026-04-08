import useMessage from '../../../../hooks/message'
import { EExportType, getExportDataFile } from '../../../../entities/import'
import useLocale from '../../../../locales/useLocale'

import { useContextStore as useStore } from '../../context'

export const useExportDownloader = (apiUrl: string) => {
  const sessionId = useStore((state) => state.sessionId)
  const { message, apiFailed } = useMessage()
  const [c] = useLocale('common')

  return {
    download: async (exportType: EExportType) => {
      try {
        message.open({
          type: 'loading',
          content: c.message.downloading,
          duration: 0,
        })
        const result = await getExportDataFile({
          apiUrl,
          params: { session_id: sessionId, export_type: exportType },
        })

        const a = document.createElement('a')
        a.href = result?.data
        a.click()

        URL.revokeObjectURL(result?.data)
        message.destroy()
      } catch (error) {
        message.destroy()
        apiFailed()
        throw error
      }
    },
  }
}
