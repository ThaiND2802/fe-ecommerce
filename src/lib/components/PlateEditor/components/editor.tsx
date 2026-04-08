import cn from 'classnames'

import type { PlateContentProps } from 'platejs/react'
import { PlateContainer, PlateContent, useEditorRef } from 'platejs/react'

import CssNormalizeWrapper from './css-normalize-wrapper'
import styles from './editor.module.less'

interface EditorContainerProps extends React.ComponentProps<'div'> {
  classNames?: {
    wrapper?: string
    plateContainer?: string
  }
}

export function EditorContainer({ className, classNames, ...props }: Readonly<EditorContainerProps>) {
  return (
    <CssNormalizeWrapper className={classNames?.wrapper}>
      <PlateContainer className={cn(styles.editorContainer, classNames?.plateContainer, className)} {...props} />
    </CssNormalizeWrapper>
  )
}

export type EditorProps = PlateContentProps
export const Editor = ({
  className,
  disabled,
  ref,
  style,
  ...props
}: EditorProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  const editor = useEditorRef()
  return (
    <PlateContent
      ref={ref}
      id={editor?.id}
      className={cn('editor-content', styles.editorContent, className)}
      disabled={disabled}
      disableDefaultStyles
      style={{
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        ...style,
      }}
      {...props}
    />
  )
}
