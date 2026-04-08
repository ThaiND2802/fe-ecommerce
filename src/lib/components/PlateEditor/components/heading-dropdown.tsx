import { useMemo } from 'react'
import { Select } from 'antd'
import { useEditorRef, useEditorSelector } from 'platejs/react'

import useLocale from '../../../locales/useLocale'
import styles from './style.module.less'

export function HeadingDropdown() {
  const editor = useEditorRef()
  const [t] = useLocale('PlateEditor')

  const headingOptions = [
    { value: 'p', label: t.heading.paragraph },
    { value: 'h1', label: t.heading.heading1 },
    { value: 'h2', label: t.heading.heading2 },
    { value: 'h3', label: t.heading.heading3 },
    { value: 'h4', label: t.heading.heading4 },
    { value: 'h5', label: t.heading.heading5 },
    { value: 'h6', label: t.heading.heading6 },
  ]

  // Subscribe to selection changes
  const selection = useEditorSelector((editor) => editor.selection, [])

  // Subscribe to editor value changes to detect node type changes
  const editorValue = useEditorSelector((editor) => editor.children, [])

  // Get current block type function
  const getCurrentType = (): string => {
    const { selection } = editor
    if (!selection) return 'p'

    try {
      // Get the block above selection using editor API
      const match = editor.api.block({
        match: (n) => {
          const type = n.type as string
          return headingOptions.some((opt) => opt.value === type)
        },
      })

      if (match) {
        const [node] = match
        const type = String(node.type)
        // Check if it's in our heading options, otherwise return 'p'
        if (headingOptions.some((opt) => opt.value === type)) {
          return type
        }
        return 'p'
      }
    } catch {
      // Fallback to paragraph
    }

    return 'p'
  }

  // Get current block type based on selection and value
  const currentType = useMemo((): string => {
    return getCurrentType()
  }, [editor, selection, editorValue])

  const handleChange = (value: string) => {
    const { selection } = editor
    if (!selection) return

    // Transform current block to the selected heading type
    // Based on PlateJS docs: https://platejs.org/docs/installation/manual
    try {
      // Try to use specific heading transforms if available (after plugins are loaded)
      const tf = editor.tf as any
      if (value === 'h1' && tf.h1) {
        tf.h1.toggle()
      } else if (value === 'h2' && tf.h2) {
        tf.h2.toggle()
      } else if (value === 'h3' && tf.h3) {
        tf.h3.toggle()
      } else if (value === 'h4' && tf.h4) {
        tf.h4.toggle()
      } else if (value === 'h5' && tf.h5) {
        tf.h5.toggle()
      } else if (value === 'h6' && tf.h6) {
        tf.h6.toggle()
      } else {
        // For paragraph or if transforms don't work, use setNodes
        editor.tf.setNodes({ type: value }, { at: selection })
      }
    } catch {
      // Fallback: use setNodes directly
      editor.tf.setNodes({ type: value }, { at: selection })
    }
  }

  return (
    <Select
      className={styles.select}
      value={currentType}
      onChange={handleChange}
      options={headingOptions}
      style={{ width: 130 }}
      placeholder={t.heading.placeholder}
    />
  )
}
