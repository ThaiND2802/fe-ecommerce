import { useCallback } from 'react'

import ToolbarButton from './toolbar-button'
import IconSax from '../../IconSax'
import { useEditorContext } from '../context'

export default function MaximizeButton() {
  const { isMaximized, toggleMaximize } = useEditorContext()

  const handleClick = useCallback(() => {
    toggleMaximize()
  }, [])

  return (
    <ToolbarButton onClick={handleClick}>
      {isMaximized ? <IconSax name="minus-square" size={14} /> : <IconSax name="maximize-3-square" size={14} />}
    </ToolbarButton>
  )
}
