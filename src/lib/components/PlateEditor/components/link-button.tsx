import { useState, useMemo, useEffect } from 'react'
import { Modal, Input, Form } from 'antd'
import { LinkOutlined } from '@ant-design/icons'
import { useEditorRef, useEditorSelector } from 'platejs/react'
import { upsertLink, unwrapLink } from '@platejs/link'

import useLocale from '../../../locales/useLocale'
import ToolbarButton from './toolbar-button'
import { isSafeUrl } from '../utils/url'

// Helper function to check if node is a link (excluding images)
function isLinkNode(element: any): boolean {
  if (element.type === 'img') {
    return false
  }
  return element.type === 'a' || element.url !== undefined
}

// Helper function to restore selection
function restoreSelection(editor: any, selection: any): boolean {
  if (!selection) {
    return false
  }
  try {
    editor.selection = selection
    return true
  } catch {
    return false
  }
}

// Helper function to check if node at path is an image
function checkImageAtPath(editor: any, path: any): any {
  try {
    const nodeAtPath = editor.api.node({ at: path })
    if (nodeAtPath) {
      const [node] = nodeAtPath
      if (node?.type === 'img') {
        return [node, path]
      }
    }
  } catch {
    // Continue
  }
  return null
}

// Helper function to find image at anchor path
function findImageAtAnchorPath(editor: any): any {
  if (!editor.selection) {
    return null
  }

  try {
    const anchorPath = editor.selection.anchor.path

    // Check node at anchor path
    const anchorResult = checkImageAtPath(editor, anchorPath)
    if (anchorResult) {
      return anchorResult
    }

    // Try parent path
    const parentPath = anchorPath.slice(0, -1)
    if (parentPath.length > 0) {
      return checkImageAtPath(editor, parentPath)
    }
  } catch {
    // Continue to next method
  }
  return null
}

// Helper function to find image using block API
function findImageUsingBlockApi(editor: any): any {
  try {
    return editor.api.block({
      match: (n) => {
        const element = n
        return element.type === 'img'
      },
    })
  } catch {
    return null
  }
}

// Helper function to find image using above API
function findImageUsingAboveApi(editor: any): any {
  if (!editor.selection) {
    return null
  }
  try {
    return editor.api.above({
      match: (n) => {
        const element = n
        return element.type === 'img'
      },
    })
  } catch {
    return null
  }
}

// Helper function to find image node using multiple methods
function findImageNode(editor: any): any {
  const anchorPathResult = findImageAtAnchorPath(editor)
  if (anchorPathResult) {
    return anchorPathResult
  }

  const blockApiResult = findImageUsingBlockApi(editor)
  if (blockApiResult) {
    return blockApiResult
  }

  return findImageUsingAboveApi(editor)
}

// Helper function to check if image is already in a link
function checkImageInLink(editor: any, imagePath: any): any {
  try {
    return editor.api.above({
      match: (n) => {
        const element = n
        return element.type === 'a'
      },
      at: imagePath,
    })
  } catch {
    return null
  }
}

// Helper function to update existing link URL
function updateLinkUrl(editor: any, linkPath: any, url: string): void {
  editor.tf.setNodes({ url: url }, { at: linkPath })
}

// Helper function to wrap image in link
function wrapImageInLink(editor: any, imageNode: any, imagePath: any, url: string): void {
  const parentPath = imagePath.slice(0, -1)
  const index = imagePath[imagePath.length - 1]
  const insertPath = parentPath.concat([index])

  editor.tf.withoutNormalizing(() => {
    editor.tf.removeNodes({ at: imagePath })

    const linkNode = {
      type: 'a',
      url: url,
      children: [imageNode],
    }

    editor.tf.insertNodes(linkNode, {
      at: insertPath,
    })
  })
}

// Helper function to handle image link insertion
function handleImageLink(editor: any, url: string): boolean {
  const imageMatch = findImageNode(editor)
  if (!imageMatch) {
    return false
  }

  const [imageNode, imagePath] = imageMatch
  const linkMatch = checkImageInLink(editor, imagePath)

  if (linkMatch) {
    const [linkPath] = linkMatch
    updateLinkUrl(editor, linkPath, url)
    return true
  }

  wrapImageInLink(editor, imageNode, imagePath, url)
  return true
}

// Helper function to handle text link insertion
function handleTextLink(editor: any, pressed: boolean, savedSelection: any, url: string): void {
  if (pressed) {
    unwrapLink(editor, { split: true })
    restoreSelection(editor, savedSelection)
  }
  upsertLink(editor, { url: url })
}

// Helper function to check if selection is in a link block
function checkLinkBlock(editor: any): { pressed: boolean; url: string } | null {
  try {
    const match = editor.api.block({
      match: (n) => isLinkNode(n),
    })

    if (match) {
      const [node] = match
      const element = node
      const url = element.url || ''
      return { pressed: true, url }
    }
  } catch {
    // Fallback
  }
  return null
}

// Helper function to check if image is wrapped in a link
function checkImageWrappedInLink(editor: any): { pressed: boolean; url: string } | null {
  try {
    const imageMatch = editor.api.block({
      match: (element) => {
        return element.type === 'img'
      },
    })

    if (!imageMatch) {
      return null
    }

    const [imagePath] = imageMatch
    const linkMatch = editor.api.above({
      match: (element) => {
        return element.type === 'a'
      },
      at: imagePath,
    })

    if (linkMatch) {
      const [element] = linkMatch
      const url = element.url || element.href || ''
      return { pressed: true, url }
    }
  } catch {
    // Fallback
  }
  return null
}

// Helper function to check for link marks in text nodes
function checkLinkMarks(editor: any): { pressed: boolean; url: string } | null {
  try {
    const marks = editor.api.marks()
    if (marks && typeof marks === 'object' && 'url' in marks) {
      const url = marks?.url
      if (url) {
        return { pressed: true, url: String(url) }
      }
    }
  } catch {
    // Fallback
  }
  return null
}

// Helper function to find link element
function findLinkElement(editor: any): { url: string } | null {
  try {
    const linkMatch = editor.api.above({
      match: (n) => isLinkNode(n),
    })

    if (linkMatch) {
      const [node] = linkMatch
      const element = node
      const url = element.url || element.href || ''
      return { url }
    }
  } catch {
    // Fallback
  }
  return null
}

// Helper function to find link mark
function findLinkMark(editor: any): { url: string } | null {
  try {
    const marks = editor.api.marks()
    if (marks && typeof marks === 'object' && 'url' in marks) {
      const url = marks?.url
      if (url) {
        return { url: String(url) }
      }
    }
  } catch {
    // Fallback
  }
  return null
}

// Helper function to get link info from image wrapped in link
function getImageWrappedLinkInfo(editor: any): { url: string } | null {
  try {
    const imageMatch = editor.api.block({
      match: (element) => {
        return element.type === 'img'
      },
    })

    if (!imageMatch) {
      return null
    }

    const [imagePath] = imageMatch
    const linkMatch = editor.api.above({
      match: (element) => {
        return element.type === 'a'
      },
      at: imagePath,
    })

    if (linkMatch) {
      const [element] = linkMatch
      const url = element.url || element.href || ''
      return { url }
    }
  } catch {
    // Fallback
  }
  return null
}

// Helper function to get current link info from editor
function getCurrentLinkInfo(editor: any): { url: string } {
  const { selection } = editor
  if (!selection) {
    return { url: '' }
  }

  const linkElement = findLinkElement(editor)
  if (linkElement) {
    return linkElement
  }

  const imageWrappedLink = getImageWrappedLinkInfo(editor)
  if (imageWrappedLink) {
    return imageWrappedLink
  }

  const linkMark = findLinkMark(editor)
  if (linkMark) {
    return linkMark
  }

  return { url: '' }
}

export function LinkButton() {
  const editor = useEditorRef()
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()
  const [savedSelection, setSavedSelection] = useState<any>(null)
  const [t] = useLocale('PlateEditor')

  const urlValidator = (_rule: any, value: any) => {
    if (!value) return Promise.resolve()

    if (isSafeUrl(value)) {
      return Promise.resolve()
    }
    return Promise.reject(new Error(t.link.invalidUrl))
  }

  // Subscribe to selection changes
  const selection = useEditorSelector((editor) => editor.selection, [])

  // Check if selection is in a link and get link info
  const linkInfo = useMemo(() => {
    if (!selection) {
      return { pressed: false, url: '' }
    }

    const linkBlockResult = checkLinkBlock(editor)
    if (linkBlockResult) {
      return linkBlockResult
    }

    const imageWrappedResult = checkImageWrappedInLink(editor)
    if (imageWrappedResult) {
      return imageWrappedResult
    }

    const linkMarksResult = checkLinkMarks(editor)
    if (linkMarksResult) {
      return linkMarksResult
    }

    return { pressed: false, url: '' }
  }, [editor, selection])

  const pressed = linkInfo.pressed

  // Update form when modal opens
  useEffect(() => {
    if (open) {
      const linkInfo = getCurrentLinkInfo(editor)
      form.setFieldsValue({
        url: linkInfo.url || '',
      })
    }
  }, [open, editor, form])

  const handleClick = () => {
    const { selection } = editor
    if (!selection) return

    // Save selection before opening modal (selection might be lost when modal opens)
    setSavedSelection(selection)

    setOpen(true)
  }

  const insertLink = (url: string) => {
    if (!restoreSelection(editor, savedSelection)) {
      return
    }

    if (!editor.selection) {
      return
    }

    if (handleImageLink(editor, url)) {
      return
    }

    handleTextLink(editor, pressed, savedSelection, url)
  }

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const { url } = values

        if (!url) {
          setOpen(false)
          return
        }

        // Close modal first
        setOpen(false)
        form.resetFields()

        // Use setTimeout to ensure modal is closed and editor can receive focus
        setTimeout(() => {
          insertLink(url)
          setSavedSelection(null)
        }, 100)
      })
      .catch(() => {
        // Form validation error - ignore
      })
  }

  const handleCancel = () => {
    setOpen(false)
    form.resetFields()
    setSavedSelection(null)
  }

  return (
    <>
      <ToolbarButton pressed={pressed} onClick={handleClick}>
        <LinkOutlined />
      </ToolbarButton>
      <Modal
        title={pressed ? t.link.edit : t.link.insert}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={t.link.ok}
        cancelText={t.link.cancel}>
        <Form form={form} layout="vertical">
          <Form.Item
            name="url"
            label={t.link.urlLabel}
            rules={[
              { required: true, message: t.link.urlRequired },
              {
                validator: urlValidator,
              },
            ]}>
            <Input placeholder={t.link.urlPlaceholder} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
