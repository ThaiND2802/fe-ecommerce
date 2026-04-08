import React, { createContext, useContext, useRef } from 'react'
import { useStore as useZustandStore, type StoreApi } from 'zustand'

export function createZustandContext<TState, TInit>(
  createState: (initial: TInit) => StoreApi<TState>,
) {
  const Context = createContext<StoreApi<TState> | null>(null)

  const Provider = ({
    initialState,
    children,
  }: {
    initialState?: TInit
    children: React.ReactNode
  }) => {
    const storeRef = useRef<StoreApi<TState>>(null)

    if (!storeRef.current) {
      storeRef.current = createState(initialState)
    }

    return <Context.Provider value={storeRef.current}>{children}</Context.Provider>
  }

  function useStore(): TState
  function useStore<U>(selector: (state: TState) => U): U
  function useStore<U>(selector?: (state: TState) => U): TState | U {
    const store = useContext(Context)
    if (!store) {
      throw new Error('useStore must be used within its Provider')
    }
    return useZustandStore(store, selector)
  }

  return [Provider, useStore] as const
}
