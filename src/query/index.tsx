import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { setSystemRequestParams } from 'src/lib/services/request'
import { setQueryClient } from 'src/lib/services/query-client'
import i18n from 'src/locales/i18n'

import { VITE_APP_MODULE_ID } from 'src/environments/environment'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
})

setQueryClient(queryClient)
setSystemRequestParams({
  module_id: VITE_APP_MODULE_ID,
})

i18n.on('languageChanged', () => {
  setTimeout(() => {
    queryClient.invalidateQueries({
      predicate: (query) => !query.queryKey?.includes('lang-independent'),
    })
  }, 1)
})

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    globalThis.addEventListener('logout', () => {
      queryClient.clear()
    })
  }, [])
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default QueryProvider
