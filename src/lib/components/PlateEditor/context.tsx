import { createContext, useContext, useState, useMemo } from 'react'

type EditorContextType = {
  isMaximized: boolean
  toggleMaximize: () => void
}

const EditorContext = createContext<EditorContextType | null>(null)

export const useEditorContext = () => {
  const ctx = useContext(EditorContext)
  if (!ctx) throw new Error('Missing EditorLayoutProvider')
  return ctx
}

export const EditorProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMaximized, setIsMaximized] = useState(false)

  const toggleMaximize = () => setIsMaximized(v => !v)

  const contextValue = useMemo(() => ({ isMaximized, toggleMaximize }), [isMaximized])

  return (
    <EditorContext.Provider value={contextValue}>
      {children}
    </EditorContext.Provider>
  )
}
