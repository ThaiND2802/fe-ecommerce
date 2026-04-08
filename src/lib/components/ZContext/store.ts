import { createContext, useContext } from 'react'
import { create, useStore as useZustandStore, type StoreApi, type UseBoundStore } from 'zustand'

export type ZStore<T> = UseBoundStore<StoreApi<T>>

export function createStore<T extends object>(
  storeCreator?: (set: any, get: any) => T,
  initialState?: Partial<T>,
) {
  return create<T>((set, get) => ({
    ...initialState,
    ...storeCreator?.(set, get),
  }))
}

export function createZContext<T extends object>() {
  const StoreContext = createContext<ZStore<T> | null>(null)

  function useStore(): T
  function useStore<U>(selector: (state: T) => U): U
  function useStore<U>(selector?: (state: T) => U): T | U {
    const store = useContext(StoreContext)
    if (!store) {
      throw new Error('Store not found')
    }
    const identitySelector = (state: T) => state
    return useZustandStore(store, (selector || identitySelector) as (state: T) => U)
  }

  return {
    StoreContext,
    useStore,
  }
}
