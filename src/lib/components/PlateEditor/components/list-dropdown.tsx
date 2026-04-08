import { useState, useEffect } from 'react'
import { Select } from 'antd'
import { useEditorRef } from 'platejs/react'
import { KEYS } from 'platejs'
import { toggleList, someList, ListStyleType } from '@platejs/list'

import useLocale from '../../../locales/useLocale'

export function ListDropdown() {
  const editor = useEditorRef()
  const [t] = useLocale('PlateEditor')

  const listOptions = [
    { value: 'none', label: t.list.none },
    { value: KEYS.ul, label: t.list.bullet },
    { value: KEYS.ol, label: t.list.number },
  ]
  const [currentList, setCurrentList] = useState<string>('none')

  const getCurrentListType = (): string => {
    const { selection } = editor
    if (!selection) return 'none'

    try {
      // Check if currently in a list using someList
      if (someList(editor, ListStyleType.Disc)) {
        return KEYS.ul
      }
      if (someList(editor, ListStyleType.Decimal)) {
        return KEYS.ol
      }
    } catch {
      // Fallback to none
    }

    return 'none'
  }

  // Listen to selection changes and update currentList automatically
  useEffect(() => {
    const updateCurrentList = () => {
      const newList = getCurrentListType()
      setCurrentList((prevList) => {
        if (prevList !== newList) {
          return newList
        }
        return prevList
      })
    }

    // Update on mount
    updateCurrentList()

    // Poll for selection changes using a short interval
    const intervalId = setInterval(() => {
      updateCurrentList()
    }, 100)

    // Also listen to DOM events for immediate updates
    const handleSelectionChange = () => {
      requestAnimationFrame(() => {
        updateCurrentList()
      })
    }

    // Listen to mouse and keyboard events that might change selection
    document.addEventListener('mouseup', handleSelectionChange)
    document.addEventListener('keyup', handleSelectionChange)
    document.addEventListener('selectionchange', handleSelectionChange)

    return () => {
      clearInterval(intervalId)
      document.removeEventListener('mouseup', handleSelectionChange)
      document.removeEventListener('keyup', handleSelectionChange)
      document.removeEventListener('selectionchange', handleSelectionChange)
    }
  }, [editor])

  const handleFocus = () => {
    setCurrentList(getCurrentListType())
  }

  const handleChange = (value: string) => {
    const { selection } = editor
    if (!selection) return

    try {
      if (value === 'none') {
        // Toggle off current list if any
        if (someList(editor, ListStyleType.Disc)) {
          toggleList(editor, { listStyleType: ListStyleType.Disc })
        }
        if (someList(editor, ListStyleType.Decimal)) {
          toggleList(editor, { listStyleType: ListStyleType.Decimal })
        }
      } else {
        // Toggle the selected list type
        const listStyleType = value === KEYS.ul ? ListStyleType.Disc : ListStyleType.Decimal
        toggleList(editor, { listStyleType })
      }
    } catch (error) {
      console.error('Error toggling list:', error)
    }

    // Update state after change
    setCurrentList(value)
  }

  return (
    <Select
      value={currentList}
      onChange={handleChange}
      onFocus={handleFocus}
      options={listOptions}
      style={{ width: 120 }}
      placeholder={t.list.placeholder}
    />
  )
}
