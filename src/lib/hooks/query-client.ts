import { QueryClient } from '@tanstack/react-query'

export const queryClient: { instance: QueryClient | null } = {
  instance: null,
}

export const setQueryClient = (client: QueryClient) => {
  queryClient.instance = client
}
