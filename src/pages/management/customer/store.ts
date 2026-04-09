import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { setEncryptedItem, getEncryptedItem, removeEncryptedItem } from 'src/lib/utils/storage'

interface State {
  searchValue: string
  setSearchValue: (searchValue: string) => void

  searchFields: string
  setSearchFields: (searchFields: string) => void

  filterVisible: boolean
  toggleFilterVisible: () => void
  setFilterVisible: (filterVisible: boolean) => void

  formVisible: boolean
  toggleFormVisible: () => void
  setFormVisible: (formVisible: boolean) => void

  id: string
  setId: (id: string) => void
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      searchValue: '',
      setSearchValue: (searchValue) => set({ searchValue }),

      searchFields: '',
      setSearchFields: (searchFields) => set({ searchFields }),

      filterVisible: false,
      toggleFilterVisible: () => set((state) => ({ filterVisible: !state.filterVisible })),
      setFilterVisible: (filterVisible) => set({ filterVisible }),

      formVisible: false,
      toggleFormVisible: () => set((state) => ({ formVisible: !state.formVisible })),
      setFormVisible: (formVisible) => set({ formVisible }),

      id: '',
      setId: (id) => set({ id }),
    }),
    {
      name: 'leave-type-store',
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
    },
  ),
)
