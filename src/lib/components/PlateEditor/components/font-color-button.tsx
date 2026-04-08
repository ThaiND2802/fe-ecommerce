import { useCallback } from 'react'
import { FontColorsOutlined } from '@ant-design/icons'
import { useEditorRef } from 'platejs/react'

import ToolbarButton from './toolbar-button'
import { ColorPickerButton } from './color-picker-button'

export function FontColorButton() {
  const editor = useEditorRef()

  const handleColorChange = useCallback(
    (hexColor: string) => {
      const { selection } = editor
      if (selection) {
        // Use type assertion since font transforms are dynamically added
        const tf = editor.tf as any
        if (tf.color) {
          tf.color.addMark(hexColor)
        }
      }
    },
    [editor],
  )

  return (
    <ColorPickerButton onChange={handleColorChange}>
      <ToolbarButton>
        <FontColorsOutlined />
      </ToolbarButton>
    </ColorPickerButton>
  )
}
