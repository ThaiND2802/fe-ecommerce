import { useCallback, useRef } from 'react'
import { PictureOutlined } from '@ant-design/icons'
import { useEditorRef } from 'platejs/react'
import { message } from 'antd'

import useLocale from '../../../locales/useLocale'
import ToolbarButton from './toolbar-button'

const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      resolve(result)
    }
    reader.onerror = () => {
      reject(new Error('Failed to read file as base64'))
    }
    reader.readAsDataURL(file)
  })
}

export function ImageUploadButton() {
  const editor = useEditorRef()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [t] = useLocale('PlateEditor')

  const handleFileSelect = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) return

      // Validate file type
      if (!file.type.startsWith('image/')) {
        message.error(t.image.uploadError)
        return
      }

      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024 // 10MB
      if (file.size > maxSize) {
        message.error(t.image.sizeError)
        return
      }

      try {
        // Convert to base64
        const base64 = await convertFileToBase64(file)

        // Ensure we have a valid selection
        if (!editor.selection) {
          // If no selection, set a default selection at the first position
          editor.selection = {
            anchor: { path: [0, 0], offset: 0 },
            focus: { path: [0, 0], offset: 0 },
          }
        }

        // Insert image node as void element (no children)
        // According to PlateJS docs and React void element requirements, img cannot have children
        try {
          // Create void image node - img is a void element and cannot have children
          const imageNode = {
            type: 'img',
            url: base64,
            children: [], // Void element must have empty children array
          } as any

          // Insert the void node
          editor.tf.insertNodes(imageNode, {
            select: true,
          })
        } catch (error) {
          console.error('Error inserting image node:', error)
        }

        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      } catch (error) {
        console.error('Error uploading image:', error)
      }
    },
    [editor, t],
  )

  const handleClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  return (
    <>
      <ToolbarButton onClick={handleClick}>
        <PictureOutlined />
      </ToolbarButton>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />
    </>
  )
}
