import { isSafeUrl } from '../utils/url'

// Link Element Component - inline element
// Link in PlateJS can be rendered as a node (block) or leaf (inline)
// This component handles both cases
export function LinkElement({ attributes, children, element }: any) {
  const url = element?.url || element?.href || ''

  // Check if link contains image node (for styling adjustments)
  const hasImage =
    Array.isArray(element?.children) && element.children.some((child: any) => child.type === 'img')

  return (
    <a
      {...attributes}
      href={isSafeUrl(url) ? url : '#'}
      target={element?.target || '_blank'}
      rel={element?.rel || 'noopener noreferrer'}
      style={{
        cursor: 'pointer',
        // When link contains image, remove text decoration and use display inline-block
        textDecoration: hasImage ? 'none' : undefined,
        display: hasImage ? 'inline-block' : undefined,
      }}>
      {children}
    </a>
  )
}

// Link Leaf Component - for inline links (text with link mark)
export function LinkLeaf({ attributes, children, leaf }: any) {
  const url = leaf?.url || leaf?.href || ''

  return (
    <a
      {...attributes}
      href={isSafeUrl(url) ? url : '#'}
      target={leaf?.target || '_blank'}
      rel={leaf?.rel || 'noopener noreferrer'}
      style={{
        color: '#1890ff',
        textDecoration: 'underline',
        cursor: 'pointer',
      }}>
      {children}
    </a>
  )
}
