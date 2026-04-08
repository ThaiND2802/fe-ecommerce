import { useEffect, useRef } from 'react'
import { MediaProvider } from '@platejs/media/react'
import { Plate, PlateEditor, usePlateEditor } from 'platejs/react'
import { Value } from 'platejs'
import cn from 'classnames'
import { Modal } from 'antd'
import DOMPurify from 'dompurify'

import ScrollContainer from '../ScrollContainer'
import { Editor, EditorContainer } from './components/editor'
import Toolbar from './components/toolbar'

import InitialValue from './plugins/initial-value'
import { BaseEditorKit } from './kit'
import { serializeValueToHtml } from './utils/serialize-html'
import CssNormalizeWrapper from './components/css-normalize-wrapper'
import styles from './index.module.less'
import { EditorProvider, useEditorContext } from './context'

interface EditorProps extends Omit<React.ComponentProps<'div'>, 'onChange'> {
  initialValue?: string
  placeholder?: string
  height?: number
  plugin?: React.ReactNode
  onChange?: (value: string, editor: PlateEditor) => void
  onFullscreenChange?: (isMaximized: boolean) => void
}

const MyEditor = ({
  className,
  initialValue,
  placeholder,
  height = 200,
  plugin,
  onChange,
  onFullscreenChange,
  ...props
}: EditorProps) => {
  const editor = usePlateEditor({
    plugins: BaseEditorKit,
  })
  const firstChangeRef = useRef(true)

  const { isMaximized } = useEditorContext()

  const onValueChange = async ({ editor, value }: { editor: PlateEditor; value: Value }) => {
    if (firstChangeRef.current) {
      firstChangeRef.current = false
      return
    }
    const html = serializeValueToHtml(value)
    onChange?.(html, editor)
  }

  useEffect(() => {
    onFullscreenChange?.(isMaximized)
  }, [isMaximized, onFullscreenChange])

  const EditorComponent = (
    <Plate editor={editor} onValueChange={onValueChange}>
      <MediaProvider>
        <div className={cn(styles.editor, className, isMaximized && 'fullscreen-mode')} {...props}>
          <Toolbar className={styles.toolbar} />
          <EditorContainer
            classNames={{
              wrapper: styles.editorWrapper,
              plateContainer: styles.editorContainer,
            }}
            style={isMaximized ? {} : { height }}>
            <ScrollContainer className={styles.scrollContainer} fullHeight>
              <Editor placeholder={placeholder} />
            </ScrollContainer>
          </EditorContainer>
        </div>
        <InitialValue value={initialValue} />
        {plugin}
      </MediaProvider>
    </Plate>
  )

  return (
    <>
      {isMaximized ? (
        <Modal
          className={styles.modal}
          title=""
          closable={false}
          footer={null}
          open={isMaximized}
          width="100vw"
          height="100vh"
          styles={{
            body: {
              padding: 0,
            },
            content: {
              borderRadius: 0,
            },
          }}>
          {EditorComponent}
        </Modal>
      ) : (
        EditorComponent
      )}
    </>
  )
}

interface PlateEditorViewProps extends Omit<React.ComponentProps<'div'>, 'children'> {
  value: string
}
export const PlateEditorView = ({ value, ...props }: PlateEditorViewProps) => {
  return (
    <CssNormalizeWrapper
      {...props}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(value) }}
    />
  )
}

export const RichTextEditorView = ({ value, ...props }: PlateEditorViewProps) => {
  if (!value) {
    return null
  }
  if (value.includes('class="o-editor"')) {
    return (
      <PlateEditorView
        className={cn(styles.editorView, props.className)}
        value={value}
        {...props}
      />
    )
  }
  return (
    <div className="ql-snow">
      <div
        className={cn('ql-editor', styles.editorView, props.className)}
        style={{ padding: 0 }}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(value) || '' }}
      />
    </div>
  )
}

export const EditorWithProvider = (props: EditorProps) => {
  return (
    <EditorProvider>
      <MyEditor {...props} />
    </EditorProvider>
  )
}

export default EditorWithProvider
