import { useMemo } from 'react'
import { Select } from 'antd'
import { useEditorRef, useEditorSelector } from 'platejs/react'


import { FONT_FAMILY_OPTIONS } from '../config'
import styles from './style.module.less'

export function FontFamilyButton() {
  const editor = useEditorRef()

  // Subscribe to selection changes
  const selection = useEditorSelector((editor) => editor.selection, [])

  // Subscribe to marks changes (fontFamily is a mark)
  const fontFamilyMark = useEditorSelector((editor) => {
    try {
      const marks = editor.api.marks() as any
      return marks?.fontFamily ? String(marks.fontFamily) : undefined
    } catch {
      return undefined
    }
  }, [])

  // Get current font family based on selection and marks
  const currentFamily = useMemo((): string | undefined => {
    if (!selection) return undefined

    try {
      // Get marks from the current selection
      const marks = editor.api.marks() as any

      if (marks?.fontFamily) {
        const fontFamily = String(marks.fontFamily)
        // Check if it's in our options
        if (FONT_FAMILY_OPTIONS.some((opt) => opt.value === fontFamily)) {
          return fontFamily
        }
        return null
      }
    } catch {
      // Fallback
    }

    return undefined
  }, [editor, selection, fontFamilyMark])

  const handleChange = (value: string) => {
    const { selection } = editor
    if (selection) {
      // Use type assertion since font transforms are dynamically added
      const tf = editor.tf as any
      if (tf.fontFamily) {
        tf.fontFamily.addMark(value)
      }
    }
  }

  // Render each option with its corresponding font family
  const optionRender = (oriOption: any) => {
    const value = String(oriOption?.value ?? '')
    const label = String(oriOption?.label ?? '')

    return <div style={{ fontFamily: value, fontSize: 14 }}>{label}</div>
  }

  // Render the selected value with its font family
  const tagRender = (props: any) => {
    const { label, value } = props
    const option = FONT_FAMILY_OPTIONS.find((opt) => opt.value === value)

    if (!option) {
      return <span>{label}</span>
    }

    return <span style={{ fontFamily: option.value }}>{label}</span>
  }

  return (
    <Select
      className={styles.select}
      value={currentFamily}
      onChange={handleChange}
      options={FONT_FAMILY_OPTIONS}
      placeholder="Font"
      style={{ width: 160 }}
      allowClear
      optionRender={optionRender}
      tagRender={tagRender}
    />
  )
}
