import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { setEncryptedItem, getEncryptedItem, removeEncryptedItem } from 'src/lib/utils/storage'

interface State {
  menuCollapsed: boolean
  setMenuCollapsed: (collapsed: boolean) => void

  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      menuCollapsed: true,
      setMenuCollapsed: (collapsed) => set({ menuCollapsed: collapsed }),

      mobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
    }),
    {
      name: 'app',
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
      partialize: (state) => ({
        menuCollapsed: state.menuCollapsed,
      }),
    },
  ),
)
