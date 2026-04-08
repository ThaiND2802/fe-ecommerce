import type { Value } from 'platejs'
import {
  INDENT_SIZE,
  EDITOR_WRAPPER_STYLES,
  LINK_COLOR,
  DEFAULT_TABLE_CELL_MIN_WIDTH,
  EMPTY_PARAGRAPH_LINE_HEIGHT,
  EMPTY_PARAGRAPH_DEFAULT_FONT_SIZE,
  TABLE_BORDER,
  TABLE_CELL_PADDING,
  TABLE_MARGIN,
  TABLE_HEADER_BACKGROUND_COLOR,
  TABLE_HEADER_FONT_WEIGHT,
} from '../config'

/**
 * Calculate margin-left based on indent value
 * 1 indent = 30px
 */
function calculateIndentMargin(indent: number | undefined): string | null {
  if (indent === undefined || indent === null || indent <= 0) {
    return null
  }
  return `${indent * INDENT_SIZE}px`
}

/**
 * Serialize PlateJS Value to HTML string
 */
export function serializeValueToHtml(value: Value): string {
  const styleAttr = buildStyleStringFromObject(EDITOR_WRAPPER_STYLES)
  const classAttr = 'o-editor'

  if (!value || Array.isArray(value) && value.length === 0 || value.every((item) => isNodeEmpty(item))) {
    return ''
  }

  // Group consecutive list items and serialize
  const htmlContent = serializeValueWithLists(value)
  return `<div class="${classAttr}"${styleAttr}>${htmlContent}</div>`
}

/**
 * Serialize heading with list content wrapped inside
 */
function serializeHeadingListContent(node: any, listStyleType: string): string {
  const listTag = listStyleType === 'decimal' ? 'ol' : 'ul'

  // Serialize children of heading (which are the list items)
  const children = serializeChildren(node)
  const styles = buildListItemStyles(node)
  const listItem = `<li${styles}>${children}</li>`

  // Build inline styles and attributes for ul/ol
  // Skip indent margin for list inside heading since heading already has the margin
  const listStyles = buildListStyles(listStyleType, node, true)
  const listStart = node?.listStart
  const startAttr = listStart && listTag === 'ol' ? ` start="${listStart}"` : ''

  return `<${listTag}${listStyles}${startAttr}>${listItem}</${listTag}>`
}

/**
 * Flush current list to result array
 */
function flushListToResult(
  currentList: Array<{ node: any; indent: number; listStyleType: string }>,
  currentListType: string | null,
  result: string[],
): void {
  if (currentList.length === 0) return

  const listTag = currentListType === 'decimal' ? 'ol' : 'ul'
  const listItems = currentList.map((item) => {
    const children = serializeChildren(item.node)
    const styles = buildListItemStyles(item.node)
    return `<li${styles}>${children}</li>`
  })

  const firstNode = currentList[0]?.node
  const listStyles = buildListStyles(currentListType, firstNode)
  const listStart = firstNode?.listStart
  const startAttr = listStart && listTag === 'ol' ? ` start="${listStart}"` : ''

  result.push(`<${listTag}${listStyles}${startAttr}>${listItems.join('')}</${listTag}>`)
}

/**
 * Handle heading with list node
 */
function handleHeadingWithList(node: any, result: string[]): void {
  const headingStyles = buildHeadingStyles(node)
  const listStyleType = node.listStyleType as string
  const listContent = serializeHeadingListContent(node, listStyleType)
  result.push(`<${node.type}${headingStyles}>${listContent}</${node.type}>`)
}

/**
 * Check if list item can be added to current list group
 */
function canAddToListGroup(
  node: any,
  currentListType: string | null,
  currentIndent: number | null,
  currentListLength: number,
): boolean {
  const listStyleType = node.listStyleType as string
  const indent = node.indent as number
  return currentListType === listStyleType && currentIndent === indent && currentListLength > 0
}

/**
 * Serialize value with proper list grouping
 * Groups consecutive nodes with listStyleType into ul/ol tags
 */
function serializeValueWithLists(value: Value): string {
  const result: string[] = []
  let currentList: Array<{ node: any; indent: number; listStyleType: string }> = []
  let currentListType: string | null = null
  let currentIndent: number | null = null

  const flushList = () => {
    flushListToResult(currentList, currentListType, result)
    currentList = []
    currentListType = null
    currentIndent = null
  }

  for (const node of value) {
    if (isHeadingWithList(node)) {
      flushList()
      handleHeadingWithList(node, result)
    } else if (isListItem(node)) {
      const listStyleType = node.listStyleType as string
      const indent = node.indent as number

      if (canAddToListGroup(node, currentListType, currentIndent, currentList.length)) {
        currentList.push({ node, indent, listStyleType })
      } else {
        flushList()
        currentList = [{ node, indent, listStyleType }]
        currentListType = listStyleType
        currentIndent = indent
      }
    } else {
      flushList()
      result.push(serializeNode(node))
    }
  }

  flushList()

  return result.join('')
}

function serializeNode(node: any): string {
  // Handle text nodes
  if (typeof node === 'object' && node.text !== undefined) {
    return serializeTextNode(node)
  }

  // Handle element nodes by type
  const nodeType = node.type
  if (!nodeType) {
    return serializeChildren(node)
  }

  switch (nodeType) {
    case 'p':
      return serializeParagraph(node)
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
      return serializeHeading(node)
    case 'li':
      return serializeListItem(node)
    case 'a':
      return serializeLink(node)
    case 'img':
      return serializeImage(node)
    case 'table':
      return serializeTable(node)
    case 'tr':
      return serializeTableRow(node)
    case 'td':
      return serializeTableCell(node)
    case 'th':
      return serializeTableHeader(node)
    default:
      return serializeChildren(node)
  }
}

function serializeTextNode(node: any): string {
  const escapedText = escapeHtml(node.text)
  const styleString = buildInlineStyles(node)
  const formattedText = applyTextFormatting(escapedText, node, styleString)

  // Handle links (can wrap formatted text)
  if (node.url) {
    const href = escapeHtml(node.url)
    const styles = buildLinkStyles()
    return `<a href="${href}"${styles} target="_blank" rel="noopener noreferrer">${formattedText}</a>`
  }

  return formattedText
}

function buildInlineStyles(node: any): string {
  const inlineStyles: Record<string, string> = {}

  // Collect all inline style properties
  if (node.color) inlineStyles.color = node.color
  if (node.backgroundColor) inlineStyles['background-color'] = node.backgroundColor
  if (node.fontSize) inlineStyles['font-size'] = node.fontSize
  if (node.fontFamily) inlineStyles['font-family'] = node.fontFamily

  if (Object.keys(inlineStyles).length === 0) {
    return ''
  }

  // Build style string with proper escaping
  const styleString = Object.entries(inlineStyles)
    .map(([key, value]) => {
      // Escape value to prevent XSS and ensure proper parsing
      const escapedValue = escapeStyleValue(value)
      return `${key}: ${escapedValue}`
    })
    .join('; ')

  // Escape HTML special characters in style string (especially quotes)
  // Use escapeHtml to handle quotes and other special chars
  const escapedStyle = escapeHtml(styleString)
  return ` style="${escapedStyle}"`
}

function applyTextFormatting(text: string, node: any, styleString: string): string {
  const hasBold = node.bold
  const hasItalic = node.italic
  const hasUnderline = node.underline
  const hasStrikethrough = node.strikethrough
  const hasMultipleMarks =
    [hasBold, hasItalic, hasUnderline, hasStrikethrough].filter(Boolean).length > 1

  if (hasMultipleMarks) {
    return applyMultipleMarks(text, node, styleString)
  }

  if (hasBold) return `<strong${styleString}>${text}</strong>`
  if (hasItalic) return `<em${styleString}>${text}</em>`
  if (hasUnderline) return `<u${styleString}>${text}</u>`
  if (hasStrikethrough) return `<s${styleString}>${text}</s>`
  if (styleString) return `<span${styleString}>${text}</span>`

  return text
}

/**
 * Apply text marks (bold, italic, underline, strikethrough) to text
 */
function applyTextMarks(text: string, node: any): string {
  let innerText = text

  if (node.strikethrough) innerText = `<s>${innerText}</s>`
  if (node.underline) innerText = `<u>${innerText}</u>`
  if (node.italic) innerText = `<em>${innerText}</em>`
  if (node.bold) innerText = `<strong>${innerText}</strong>`

  return innerText
}

/**
 * Apply styles to the outermost mark element
 */
function applyStylesToOutermostMark(innerText: string, node: any, styleString: string): string {
  if (!styleString) {
    return innerText
  }

  if (node.bold) {
    return innerText.replace('<strong>', `<strong${styleString}>`)
  }
  if (node.italic) {
    return innerText.replace('<em>', `<em${styleString}>`)
  }
  if (node.underline) {
    return innerText.replace('<u>', `<u${styleString}>`)
  }
  if (node.strikethrough) {
    return innerText.replace('<s>', `<s${styleString}>`)
  }

  return `<span${styleString}>${innerText}</span>`
}

function applyMultipleMarks(text: string, node: any, styleString: string): string {
  const innerText = applyTextMarks(text, node)
  return applyStylesToOutermostMark(innerText, node, styleString)
}

function serializeParagraph(node: any): string {
  // Check if paragraph is empty (no children or only empty text)
  const isEmpty = isNodeEmpty(node)

  const styles = buildBlockStyles(node, isEmpty)
  const children = serializeChildren(node)
  return `<p${styles}>${children}</p>`
}

function serializeHeading(node: any): string {
  const styles = buildHeadingStyles(node)
  const children = serializeChildren(node)
  return `<${node.type}${styles}>${children}</${node.type}>`
}

/**
 * Get default font size for heading level
 */
function getDefaultHeadingFontSize(headingType: string): string | null {
  const defaultFontSizes: Record<string, string> = {
    h1: '2.5em',
    h2: '2em',
    h3: '1.5em',
    h4: '1.25em',
    h5: '1em',
    h6: '0.875em',
  }
  return defaultFontSizes[headingType] || null
}

/**
 * Get indent margin for heading
 */
function getHeadingIndentMargin(node: any): string | null {
  const hasListStyleType = isHeadingWithList(node)
  const isH1OrH2 = node.type === 'h1' || node.type === 'h2'

  if (hasListStyleType && isH1OrH2 && node.indent === 1) {
    return '40px'
  }

  return calculateIndentMargin(node.indent)
}

/**
 * Build styles for heading elements, including default fontSize based on heading level
 */
function buildHeadingStyles(node: any): string {
  const styles: Record<string, string> = {}

  // Add default fontSize based on heading level if not explicitly set
  if (!node.fontSize) {
    const defaultSize = getDefaultHeadingFontSize(node.type)
    if (defaultSize) {
      styles['font-size'] = defaultSize
    }
  }

  // Text align
  if (node.align) {
    styles['text-align'] = node.align
  }

  // Indent (margin-left)
  const indentMargin = getHeadingIndentMargin(node)
  if (indentMargin) {
    styles['margin-left'] = indentMargin
  }

  // Font properties (can be on block level)
  if (node.color) styles.color = node.color
  if (node.backgroundColor) styles['background-color'] = node.backgroundColor
  if (node.fontSize) styles['font-size'] = node.fontSize
  if (node.fontFamily) styles['font-family'] = node.fontFamily

  if (Object.keys(styles).length === 0) {
    return ''
  }

  // Build style string with proper escaping
  const styleString = Object.entries(styles)
    .map(([key, value]) => {
      const escapedValue = escapeStyleValue(value)
      return `${key}: ${escapedValue}`
    })
    .join('; ')

  const escapedStyle = escapeHtml(styleString)
  return ` style="${escapedStyle}"`
}

function serializeListItem(node: any): string {
  const styles = buildListItemStyles(node)
  const children = serializeChildren(node)
  return `<li${styles}>${children}</li>`
}

function serializeLink(node: any): string {
  const href = escapeHtml(node.url || '')
  const children = serializeChildren(node)
  const styles = buildLinkStyles()
  return `<a href="${href}"${styles} target="_blank" rel="noopener noreferrer">${children}</a>`
}

function serializeImage(node: any): string {
  const src = escapeHtml(node.url || '')
  const width = node.width ? ` width="${node.width}"` : ''
  const height = node.height ? ` height="${node.height}"` : ''
  return `<img src="${src}"${width}${height} alt="" />`
}

function serializeTable(node: any): string {
  const styles = buildTableStyles(node)
  // Get colSizes from table node - this field contains column widths after resizing
  // colSizes is an array of numbers (pixels) representing the width of each column
  const colSizes = node.colSizes || []
  // Serialize rows with colSizes context to apply column widths
  const rows = serializeTableRowsWithColSizes(node, colSizes)
  const tableHtml = `<table${styles}>${rows}</table>`
  // Wrap table in a div with fit-content width
  const wrapperStyles = buildStyleStringFromObject({ width: 'fit-content' })
  return `<div${wrapperStyles} data-node-skip>${tableHtml}</div>`
}

/**
 * Serialize table rows with colSizes context
 */
function serializeTableRowsWithColSizes(tableNode: any, colSizes: number[]): string {
  if (!tableNode.children || !Array.isArray(tableNode.children)) {
    return ''
  }
  return tableNode.children
    .map((rowNode: any) => serializeTableRowWithColSizes(rowNode, colSizes))
    .join('')
}

function serializeTableRowWithColSizes(rowNode: any, colSizes: number[]): string {
  const styles = buildTableRowStyles(rowNode)
  if (!rowNode.children || !Array.isArray(rowNode.children)) {
    return `<tr${styles}></tr>`
  }
  // Track column index as we serialize cells
  let colIndex = 0
  const cells = rowNode.children
    .map((cellNode: any) => {
      // Check if it's a header cell (th) or regular cell (td)
      const isHeader = cellNode.type === 'th'
      const cellHtml = isHeader
        ? serializeTableHeaderWithColSizes(cellNode, colSizes, colIndex)
        : serializeTableCellWithColSizes(cellNode, colSizes, colIndex)
      // Increment colIndex by colSpan (or 1 if no colSpan)
      // This ensures we track the correct column index for cells with colSpan
      const colSpan = cellNode.colSpan || 1
      colIndex += colSpan
      return cellHtml
    })
    .join('')
  return `<tr${styles}>${cells}</tr>`
}

function serializeTableRow(node: any): string {
  const styles = buildTableRowStyles(node)
  const cells = serializeChildren(node)
  return `<tr${styles}>${cells}</tr>`
}

function serializeTableCell(node: any): string {
  const styles = buildTableCellStyles(node)
  const children = serializeChildren(node)
  const colSpan = node.colSpan && node.colSpan > 1 ? ` colspan="${node.colSpan}"` : ''
  const rowSpan = node.rowSpan && node.rowSpan > 1 ? ` rowspan="${node.rowSpan}"` : ''
  return `<td${styles}${colSpan}${rowSpan}>${children}</td>`
}

/**
 * Serialize table cell with colSizes support
 */
function serializeTableCellWithColSizes(node: any, colSizes: number[], colIndex: number): string {
  const styles = buildTableCellStylesWithColSizes(node, colSizes, colIndex)
  const children = serializeChildren(node)
  const colSpan = node.colSpan && node.colSpan > 1 ? ` colspan="${node.colSpan}"` : ''
  const rowSpan = node.rowSpan && node.rowSpan > 1 ? ` rowspan="${node.rowSpan}"` : ''
  return `<td${styles}${colSpan}${rowSpan}>${children}</td>`
}

/**
 * Serialize table header cell with colSizes support
 */
function serializeTableHeaderWithColSizes(node: any, colSizes: number[], colIndex: number): string {
  const styles = buildTableCellStylesWithColSizes(node, colSizes, colIndex)
  const children = serializeChildren(node)
  const colSpan = node.colSpan && node.colSpan > 1 ? ` colspan="${node.colSpan}"` : ''
  const rowSpan = node.rowSpan && node.rowSpan > 1 ? ` rowspan="${node.rowSpan}"` : ''
  return `<th${styles}${colSpan}${rowSpan}>${children}</th>`
}

function serializeTableHeader(node: any): string {
  const styles = buildTableCellStyles(node)
  const children = serializeChildren(node)
  const colSpan = node.colSpan && node.colSpan > 1 ? ` colspan="${node.colSpan}"` : ''
  const rowSpan = node.rowSpan && node.rowSpan > 1 ? ` rowspan="${node.rowSpan}"` : ''
  return `<th${styles}${colSpan}${rowSpan}>${children}</th>`
}

/**
 * Check if a node is a list item (has listStyleType and indent)
 * Cross-safe type checking for list items
 */
function isListItem(node: any): boolean {
  if (!node || typeof node !== 'object') return false
  const listStyleType = node.listStyleType
  const indent = node.indent
  return (
    (listStyleType === 'disc' || listStyleType === 'decimal') &&
    indent !== undefined &&
    indent !== null &&
    typeof indent === 'number' &&
    indent > 0
  )
}

/**
 * Check if a node is a heading with list
 * Cross-safe type checking for headings with listStyleType
 */
function isHeadingWithList(node: any): boolean {
  if (!node || typeof node !== 'object') return false
  const nodeType = node.type
  const listStyleType = node.listStyleType
  const indent = node.indent
  return (
    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(nodeType) &&
    (listStyleType === 'disc' || listStyleType === 'decimal') &&
    indent !== undefined &&
    indent !== null &&
    typeof indent === 'number' &&
    indent > 0
  )
}

/**
 * Flush current list to result array (for serializeChildrenWithLists)
 */
function flushListToResultRecursive(
  currentList: Array<{ node: any; indent: number; listStyleType: string }>,
  currentListType: string | null,
  result: string[],
): void {
  if (currentList.length === 0) return

  const listTag = currentListType === 'decimal' ? 'ol' : 'ul'
  const listItems = currentList.map((item) => {
    const itemChildren = serializeChildrenWithLists(item.node.children || [])
    const styles = buildListItemStyles(item.node)
    return `<li${styles}>${itemChildren}</li>`
  })

  const firstNode = currentList[0]?.node
  const listStyles = buildListStyles(currentListType, firstNode)
  const listStart = firstNode?.listStart
  const startAttr = listStart && listTag === 'ol' ? ` start="${listStart}"` : ''

  result.push(`<${listTag}${listStyles}${startAttr}>${listItems.join('')}</${listTag}>`)
}

/**
 * Serialize children with proper list grouping
 * This function handles list items in any context (table cells, paragraphs, etc.)
 * Groups consecutive nodes with listStyleType into ul/ol tags
 */
function serializeChildrenWithLists(children: any[]): string {
  if (!children || !Array.isArray(children) || children.length === 0) {
    return ''
  }

  const result: string[] = []
  let currentList: Array<{ node: any; indent: number; listStyleType: string }> = []
  let currentListType: string | null = null
  let currentIndent: number | null = null

  const flushList = () => {
    flushListToResultRecursive(currentList, currentListType, result)
    currentList = []
    currentListType = null
    currentIndent = null
  }

  for (const node of children) {
    if (isHeadingWithList(node)) {
      flushList()
      const headingStyles = buildHeadingStyles(node)
      const listContent = serializeHeadingListContent(node, node.listStyleType)
      result.push(`<${node.type}${headingStyles}>${listContent}</${node.type}>`)
    } else if (isListItem(node)) {
      const listStyleType = node.listStyleType
      const indent = node.indent

      if (canAddToListGroup(node, currentListType, currentIndent, currentList.length)) {
        currentList.push({ node, indent, listStyleType })
      } else {
        flushList()
        currentList = [{ node, indent, listStyleType }]
        currentListType = listStyleType
        currentIndent = indent
      }
    } else {
      flushList()
      result.push(serializeNode(node))
    }
  }

  flushList()

  return result.join('')
}

/**
 * Serialize children nodes
 * Uses serializeChildrenWithLists to properly handle list items in any context
 */
function serializeChildren(node: any): string {
  if (!node.children || !Array.isArray(node.children)) {
    return ''
  }
  return serializeChildrenWithLists(node.children)
}

/**
 * Check if a node is empty (no meaningful content)
 */
function isNodeEmpty(node: any): boolean {
  if (!node.children || !Array.isArray(node.children) || node.children.length === 0) {
    return true
  }

  // Check if all children are empty text nodes
  return node.children.every((child: any) => {
    if (typeof child === 'object' && child.text !== undefined) {
      return !child.text || child.text.trim().length === 0
    }
    return false
  })
}

function buildBlockStyles(node: any, isEmpty = false): string {
  const styles: Record<string, string> = {
    'margin-top': '0px',
    'margin-bottom': '0px',
  }

  // Text align
  if (node.align) {
    styles['text-align'] = node.align
  }

  // Indent (margin-left)
  const indentMargin = calculateIndentMargin(node.indent)
  if (indentMargin) {
    styles['margin-left'] = indentMargin
  }

  // Font properties (can be on block level)
  if (node.color) styles.color = node.color
  if (node.backgroundColor) styles['background-color'] = node.backgroundColor
  if (node.fontSize) styles['font-size'] = node.fontSize
  if (node.fontFamily) styles['font-family'] = node.fontFamily

  // Add line-height and min-height for empty paragraph nodes
  // min-height ensures the paragraph has height even when empty
  if (isEmpty) {
    styles['line-height'] = String(EMPTY_PARAGRAPH_LINE_HEIGHT)
    // Calculate min-height based on font-size * line-height
    const minHeight = EMPTY_PARAGRAPH_DEFAULT_FONT_SIZE * EMPTY_PARAGRAPH_LINE_HEIGHT
    styles['min-height'] = `${minHeight}px`
  }

  // Build style string with proper escaping
  const styleString = Object.entries(styles)
    .map(([key, value]) => {
      // Escape value to prevent XSS and ensure proper parsing
      const escapedValue = escapeStyleValue(value)
      return `${key}: ${escapedValue}`
    })
    .join('; ')

  // Escape HTML special characters in style string (especially quotes)
  // Use escapeHtml to handle quotes and other special chars
  const escapedStyle = escapeHtml(styleString)
  return ` style="${escapedStyle}"`
}

/**
 * Build styles for link elements (a)
 * Includes text-decoration: none
 */
function buildLinkStyles(): string {
  const styles: Record<string, string> = {
    'text-decoration': 'none',
    color: LINK_COLOR,
  }

  return buildStyleStringFromObject(styles)
}

/**
 * Build styles for list item elements (li)
 * Excludes font-size as requested
 */
function buildListItemStyles(node: any): string {
  const styles: Record<string, string> = {}

  // Text align
  if (node.align) {
    styles['text-align'] = node.align
  }

  // Indent is handled on ul/ol level, not on individual li tags to avoid duplication

  // Font properties (excluding fontSize)
  if (node.color) styles.color = node.color
  if (node.backgroundColor) styles['background-color'] = node.backgroundColor
  if (node.fontFamily) styles['font-family'] = node.fontFamily

  if (Object.keys(styles).length === 0) {
    return ''
  }

  // Build style string with proper escaping
  const styleString = Object.entries(styles)
    .map(([key, value]) => {
      // Escape value to prevent XSS and ensure proper parsing
      const escapedValue = escapeStyleValue(value)
      return `${key}: ${escapedValue}`
    })
    .join('; ')

  // Escape HTML special characters in style string (especially quotes)
  // Use escapeHtml to handle quotes and other special chars
  const escapedStyle = escapeHtml(styleString)
  return ` style="${escapedStyle}"`
}

function escapeHtml(text: string): string {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

/**
 * Escape CSS style value to ensure proper parsing
 * Handles special characters that could break CSS parsing
 * Note: HTML attribute escaping (quotes, etc.) is handled by escapeHtml
 */
function escapeStyleValue(value: string): string {
  // CSS values should not contain unescaped semicolons (they would break parsing)
  // Escape semicolons using CSS escape sequence
  if (value.includes(';')) {
    const escapedSemicolon = String.raw`\3b `
    return value.replaceAll(';', escapedSemicolon)
  }
  // Other special characters in CSS values are handled by escapeHtml
  // when the entire style string is escaped for HTML attribute
  return value
}

/**
 * Build style string from styles object
 */
function buildStyleStringFromObject(styles: Record<string, string>): string {
  if (Object.keys(styles).length === 0) {
    return ''
  }

  const styleString = Object.entries(styles)
    .map(([key, value]) => {
      const escapedValue = escapeStyleValue(value)
      return `${key}: ${escapedValue}`
    })
    .join('; ')

  const escapedStyle = escapeHtml(styleString)
  return ` style="${escapedStyle}"`
}

/**
 * Build styles for table elements
 */
function buildTableStyles(node: any): string {
  const styles: Record<string, string> = {
    width: '100%',
    'border-collapse': 'collapse',
    margin: TABLE_MARGIN,
    border: TABLE_BORDER,
  }

  return buildStyleStringFromObject(styles)
}

/**
 * Build styles for table row elements
 */
function buildTableRowStyles(node: any): string {
  const styles: Record<string, string> = {
    'border-bottom': TABLE_BORDER,
  }

  return buildStyleStringFromObject(styles)
}

/**
 * Build styles for table cell elements (td/th)
 */
function buildTableCellStyles(node: any): string {
  return buildTableCellStylesWithColSizes(node, [], 0)
}

/**
 * Get width from colSizes array
 */
function getWidthFromColSizes(colSizes: number[], colIndex: number): string | null {
  if (!colSizes || !Array.isArray(colSizes) || colSizes.length === 0) {
    return null
  }

  if (colIndex < 0 || colIndex >= colSizes.length) {
    return null
  }

  const colWidth = colSizes[colIndex]
  if (
    colWidth !== undefined &&
    colWidth !== null &&
    typeof colWidth === 'number' &&
    colWidth > 0
  ) {
    return `${colWidth}px`
  }

  return null
}

/**
 * Get width from node property (fallback)
 */
function getWidthFromNode(node: any): string | null {
  if (node.width === undefined || node.width === null) {
    return null
  }

  if (typeof node.width === 'number') {
    return `${node.width}px`
  }

  if (typeof node.width === 'string') {
    return node.width
  }

  return null
}

/**
 * Get min-height from node
 */
function getMinHeightFromNode(node: any): string | null {
  if (node.minHeight === undefined || node.minHeight === null) {
    return null
  }

  if (typeof node.minHeight === 'number') {
    return `${node.minHeight}px`
  }

  if (typeof node.minHeight === 'string') {
    return node.minHeight
  }

  return null
}

/**
 * Apply header cell styles
 */
function applyHeaderCellStyles(styles: Record<string, string>, node: any): void {
  if (node.type !== 'th') {
    return
  }

  if (!node.backgroundColor) {
    styles['background-color'] = TABLE_HEADER_BACKGROUND_COLOR
  }
  styles['font-weight'] = TABLE_HEADER_FONT_WEIGHT
}

/**
 * Build styles for table cell elements (td/th) with colSizes support
 * @param node - The cell node
 * @param colSizes - Array of column widths from table node
 * @param colIndex - The column index of this cell
 */
function buildTableCellStylesWithColSizes(node: any, colSizes: number[], colIndex: number): string {
  const styles: Record<string, string> = {
    border: TABLE_BORDER,
    padding: TABLE_CELL_PADDING,
    'vertical-align': 'top',
  }

  // Width from colSizes (priority) or node property (fallback)
  const widthFromColSizes = getWidthFromColSizes(colSizes, colIndex)
  const widthFromNode = getWidthFromNode(node)

  if (widthFromColSizes) {
    styles.width = widthFromColSizes
  } else if (widthFromNode) {
    styles.width = widthFromNode
  } else {
    styles['min-width'] = `${DEFAULT_TABLE_CELL_MIN_WIDTH}px`
  }

  // Min-height from resize feature
  const minHeight = getMinHeightFromNode(node)
  if (minHeight) {
    styles['min-height'] = minHeight
  }

  // Text align
  if (node.align) {
    styles['text-align'] = node.align
  }

  // Font properties
  if (node.color) styles.color = node.color
  if (node.backgroundColor) styles['background-color'] = node.backgroundColor
  if (node.fontSize) styles['font-size'] = node.fontSize
  if (node.fontFamily) styles['font-family'] = node.fontFamily

  // Header cell styles
  applyHeaderCellStyles(styles, node)

  if (node.background) styles['background-color'] = node.background

  return buildStyleStringFromObject(styles)
}

/**
 * Build styles for list elements (ul/ol)
 * Includes listStyleType and margin-left based on indent
 * Always applies indent from the node to ensure consistent serialization
 * regardless of context (top-level, table cells, paragraphs, etc.)
 * @param skipIndent - If true, skip applying margin-left (useful when list is inside heading)
 */
function buildListStyles(
  listStyleType: string | null,
  firstItem?: any,
  skipIndent = false,
): string {
  const styles: Record<string, string> = {
    'padding-inline-start': '0',
  }

  // Add listStyleType
  if (listStyleType) {
    styles['list-style-type'] = listStyleType
  }

  // Apply indent (margin-left) from the node, unless skipIndent is true
  // This prevents duplicate margin when list is inside heading (heading already has margin)
  if (!skipIndent && firstItem) {
    const indentMargin = calculateIndentMargin(firstItem.indent)
    if (indentMargin) {
      styles['margin-left'] = indentMargin
    }
  }

  if (Object.keys(styles).length === 0) {
    return ''
  }

  // Build style string with proper escaping
  const styleString = Object.entries(styles)
    .map(([key, value]) => {
      // Escape value to prevent XSS and ensure proper parsing
      const escapedValue = escapeStyleValue(value)
      return `${key}: ${escapedValue}`
    })
    .join('; ')

  // Escape HTML special characters in style string (especially quotes)
  // Use escapeHtml to handle quotes and other special chars
  const escapedStyle = escapeHtml(styleString)
  return ` style="${escapedStyle}"`
}
