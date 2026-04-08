import { useMemo } from 'react'
import { Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import {
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  MenuOutlined,
} from '@ant-design/icons'
import { useEditorRef, useEditorSelector } from 'platejs/react'

import ToolbarButton from './toolbar-button'

const alignIconMap: Record<string, React.ReactNode> = {
  left: <AlignLeftOutlined />,
  center: <AlignCenterOutlined />,
  right: <AlignRightOutlined />,
  justify: <MenuOutlined />,
}

const alignOptions = [
  { value: 'left', icon: <AlignLeftOutlined /> },
  { value: 'center', icon: <AlignCenterOutlined /> },
  { value: 'right', icon: <AlignRightOutlined /> },
  { value: 'justify', icon: <MenuOutlined /> },
]

export function TextAlignDropdown() {
  const editor = useEditorRef()

  // Subscribe to selection changes
  const selection = useEditorSelector((editor) => editor.selection, [])

  // Subscribe to editor value changes to detect node property changes
  const editorValue = useEditorSelector((editor) => editor.children, [])

  // Subscribe to current block align property to detect changes
  const currentBlockAlign = useEditorSelector((editor) => {
    try {
      const { selection } = editor
      if (!selection) return null
      const match = editor.api.block()
      if (match) {
        const [node] = match
        const element = node as any
        return element.align || element.textAlign || null
      }
    } catch {
      // Fallback
    }
    return null
  }, [])

  // Get current alignment based on selection and node properties
  const currentAlign = useMemo((): string => {
    if (!selection) return 'left'

    try {
      // Get the block above selection
      const match = editor.api.block()
      if (match) {
        const [node] = match
        const element = node as any
        const align = element.align || element.textAlign
        if (align) {
          // Map 'start' to 'left' and 'end' to 'right' for consistency
          if (align === 'start') return 'left'
          if (align === 'end') return 'right'
          if (alignOptions.some((opt) => opt.value === align)) {
            return align
          }
        }
      }
    } catch {
      // Fallback
    }

    return 'left'
  }, [editor, selection, editorValue, currentBlockAlign])

  const handleAlignChange = (value: string) => {
    const { selection } = editor
    if (selection) {
      // Use type assertion since textAlign transform is dynamically added
      const tf = editor.tf as any
      if (tf.textAlign) {
        tf.textAlign.setNodes(value)
      }
    }
  }

  const menuItems: MenuProps['items'] = alignOptions.map((option) => ({
    key: option.value,
    label: <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>{option.icon}</span>,
    onClick: () => handleAlignChange(option.value),
  }))

  return (
    <Dropdown menu={{ items: menuItems }} trigger={['click']} placement="bottom">
      <ToolbarButton pressed={false}>
        {alignIconMap[currentAlign] || <AlignLeftOutlined />}
      </ToolbarButton>
    </Dropdown>
  )
}
