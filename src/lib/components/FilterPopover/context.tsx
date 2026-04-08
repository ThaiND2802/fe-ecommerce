import { create } from 'zustand'

import { createZustandContext } from '../../hooks/zustand-context'
import { TableColumn } from '../TableColumnSelect'

interface ContextState {
  activatedFilterFiles: {
    [key: string]: boolean
  }
  setActivatedFilterFiles: (activatedFilterFiles: { [key: string]: boolean }) => void

  visibleColumns?: TableColumn[]
  setVisibleColumns: (visibleColumns: TableColumn[]) => void

  hiddenColumns?: TableColumn[]
  setHiddenColumns: (hiddenColumns: TableColumn[]) => void

  filterValues: any
  setFilterValues: (filterValues: any) => void

  searchValue: string
  setSearchValue: (searchValue: string) => void
}

export const createContextStore = (initialState: Partial<ContextState>) =>
  create<ContextState>((set) => ({
    activatedFilterFiles: initialState.activatedFilterFiles,
    setActivatedFilterFiles: (activatedFilterFiles: { [key: string]: boolean }) => {
      set({ activatedFilterFiles })
    },

    visibleColumns: [],
    setVisibleColumns: (visibleColumns: TableColumn[]) => {
      set({ visibleColumns })
    },

    hiddenColumns: [],
    setHiddenColumns: (hiddenColumns: TableColumn[]) => {
      set({ hiddenColumns })
    },

    filterValues: {},
    setFilterValues: (filterValues: any) => {
      set({ filterValues })
    },

    searchValue: '',
    setSearchValue: (searchValue: string) => {
      set({ searchValue })
    },
  }))

export const [Provider, useContextStore] = createZustandContext(createContextStore)
