import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { setEncryptedItem, getEncryptedItem, removeEncryptedItem } from 'src/lib/utils/storage'

interface State {}

export const useStore = create<State>()(
  persist((set) => ({}), {
    name: 'home-store',
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
    partialize: (state) => ({}),
  }),
)
