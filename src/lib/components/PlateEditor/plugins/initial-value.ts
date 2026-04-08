import { useEffect } from 'react'
import { useEditorRef } from 'platejs/react'

import { parseHtmlToValue } from '../utils/parse-html'

const InitialValue = ({ value }: { value?: string }) => {
  const editor = useEditorRef()

  useEffect(() => {
    if (!editor || editor.initialized) return
    const slateValue = parseHtmlToValue(value)

    editor?.tf?.setValue(slateValue)
    editor.initialized = true
  }, [value, editor])

  return null
}

export default InitialValue
