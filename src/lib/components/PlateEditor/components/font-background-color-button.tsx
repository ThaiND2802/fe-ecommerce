import { useCallback } from 'react'
import { BgColorsOutlined } from '@ant-design/icons'
import { useEditorRef } from 'platejs/react'

import ToolbarButton from './toolbar-button'
import { ColorPickerButton } from './color-picker-button'

export function FontBackgroundColorButton() {
  const editor = useEditorRef()

  const handleColorChange = useCallback(
    (hexColor: string) => {
      const { selection } = editor
      if (selection) {
        // Use type assertion since font transforms are dynamically added
        const tf = editor.tf as any
        if (tf.backgroundColor) {
          tf.backgroundColor.addMark(hexColor)
        }
      }
    },
    [editor],
  )

  return (
    <ColorPickerButton onChange={handleColorChange}>
      <ToolbarButton>
        <BgColorsOutlined />
      </ToolbarButton>
    </ColorPickerButton>
  )
}
