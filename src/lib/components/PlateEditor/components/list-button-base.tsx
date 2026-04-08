import { ReactNode } from 'react'
import { useEditorRef, useEditorSelector } from 'platejs/react'
import { toggleList, someList, ListStyleType } from '@platejs/list'

import ToolbarButton from './toolbar-button'

interface ListButtonBaseProps {
  readonly listStyleType: ListStyleType
  readonly icon: ReactNode
}

export function ListButtonBase({ listStyleType, icon }: ListButtonBaseProps) {
  const editor = useEditorRef()

  // Check if currently in a list (simplified like Shadcn)
  const pressed = useEditorSelector(
    (editor) => {
      try {
        return someList(editor, listStyleType)
      } catch {
        return false
      }
    },
    [listStyleType],
  )

  const handleClick = () => {
    // Call toggleList directly like Shadcn
    toggleList(editor, { listStyleType })
  }

  return (
    <ToolbarButton pressed={pressed} onClick={handleClick}>
      {icon}
    </ToolbarButton>
  )
}
