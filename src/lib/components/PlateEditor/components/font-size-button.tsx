import { useMemo } from 'react'
import { Select } from 'antd'
import { useEditorRef, useEditorSelector } from 'platejs/react'

import styles from './style.module.less'

const fontSizeOptions = [
  { value: '12px', label: '12px' },
  { value: '14px', label: '14px' },
  { value: '16px', label: '16px' },
  { value: '18px', label: '18px' },
  { value: '20px', label: '20px' },
  { value: '24px', label: '24px' },
  { value: '28px', label: '28px' },
  { value: '32px', label: '32px' },
  { value: '36px', label: '36px' },
  { value: '48px', label: '48px' },
]

export function FontSizeButton() {
  const editor = useEditorRef()

  // Subscribe to selection changes
  const selection = useEditorSelector((editor) => editor.selection, [])

  // Subscribe to marks changes (fontSize is a mark)
  const fontSizeMark = useEditorSelector((editor) => {
    try {
      const marks = editor.api.marks() as any
      return marks?.fontSize ? String(marks.fontSize) : undefined
    } catch {
      return undefined
    }
  }, [])

  // Get current font size based on selection and marks
  const currentSize = useMemo((): string | undefined => {
    if (!selection) return undefined

    try {
      // Get marks from the current selection
      const marks = editor.api.marks() as any

      if (marks?.fontSize) {
        const fontSize = String(marks.fontSize)
        // Check if it's in our options
        if (fontSizeOptions.some((opt) => opt.value === fontSize)) {
          return fontSize
        }
        return fontSize // Return even if not in options
      }
    } catch {
      // Fallback
    }

    return undefined
  }, [editor, selection, fontSizeMark])

  const handleChange = (value: string) => {
    const { selection } = editor
    if (selection) {
      // Use type assertion since font transforms are dynamically added
      const tf = editor.tf as any
      if (tf.fontSize) {
        tf.fontSize.addMark(value)
      }
    }
  }

  return (
    <Select
      className={styles.select}
      value={currentSize}
      onChange={handleChange}
      options={fontSizeOptions}
      placeholder="Size"
      style={{ width: 80 }}
      allowClear
    />
  )
}
