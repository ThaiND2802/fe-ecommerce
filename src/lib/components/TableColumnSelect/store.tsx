import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { setEncryptedItem, getEncryptedItem, removeEncryptedItem } from 'src/lib/utils/storage'
import { TableColumn } from '.'

interface State {
  [key: string]: {
    columns: TableColumn[]
  }
}

export const useStore = create<State>()(
  persist((set) => ({}), {
    name: 'table-column',
    storage: {
      getItem: (name: string) => {
        return getEncryptedItem(name)
      },
      setItem: (name: string, value: any) => {
        setEncryptedItem(name, value)
      },
      removeItem: (name: string) => {
        removeEncryptedItem(name)
      },
    },
    partialize: () => ({}),
  }),
)
