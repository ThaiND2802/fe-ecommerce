import { useState } from 'react'

import { createStore, createZContext } from './store'

interface IProps<T extends object> {
  readonly children: React.ReactNode
  readonly initialState?: Partial<T>
  readonly storeCreator?: (set: any, get: any) => T
  readonly context: ReturnType<typeof createZContext<T>>
}

function ZContext<T extends object>({ children, storeCreator, initialState, context }: IProps<T>) {
  const { StoreContext } = context
  const [store] = useState(() => createStore<T>(storeCreator, initialState))

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export default ZContext
export { createZContext, createStore } from './store'
export type { ZStore } from './store'
