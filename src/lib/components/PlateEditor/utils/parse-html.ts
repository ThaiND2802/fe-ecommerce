import type { Value } from 'platejs'
import { INDENT_SIZE } from '../config'

/**
 * Calculate indent from margin-left value
 * 1 indent = 30px (except for h1/h2 headings with lists, first indent = 40px)
 * @param marginLeft - CSS margin-left value (e.g., "30px", "60px", "40px")
 * @param isHeadingWithList - Whether this is a heading with list inside
 * @param headingType - The heading type (h1-h6) if it's a heading
 * @returns indent level or undefined
 */
function calculateIndentFromMargin(
  marginLeft: string | undefined,
  isHeadingWithList = false,
  headingType?: string,
): number | undefined {
  if (!marginLeft) return undefined

  // Extract numeric value from margin string (e.g., "30px" -> 30)
  const regex = /^(\d+(?:\.\d+)?)px$/
  const match = regex.exec(marginLeft)
  if (!match) return undefined

  const pixels = Number.parseFloat(match[1])
  if (Number.isNaN(pixels) || pixels < 0) return undefined

  // Hack: For h1/h2 headings with lists, 40px = indent 1
  const isH1OrH2 = headingType === 'h1' || headingType === 'h2'
  if (isHeadingWithList && isH1OrH2 && Math.abs(pixels - 40) < 0.5) {
    return 1
  }

  // Round to nearest indent level (30px per level)
  const indent = Math.round(pixels / INDENT_SIZE)
  return indent > 0 ? indent : undefined
}

/**
 * Helper function to apply mark to children
 */
function applyMarkToChildren(childrenNodes: any[], mark: string): any {
  if (childrenNodes.length === 0) {
    return { [mark]: true, text: '' }
  }

  return childrenNodes.map((child) => {
    if (typeof child === 'object' && child.text !== undefined) {
      return { ...child, [mark]: true }
    }
    return child
  })
}

/**
 * Apply style value to styles object based on normalized key
 */
function applyStyleValue(
  normalizedKey: string,
  value: string,
  styles: Record<string, string>,
): void {
  const styleMap: Record<string, string> = {
    color: 'color',
    'background-color': 'backgroundColor',
    'font-size': 'fontSize',
    'font-family': 'fontFamily',
    'margin-left': 'marginLeft',
    'text-align': 'textAlign',
    width: 'width',
    'min-height': 'min-height',
  }

  const property = styleMap[normalizedKey]
  if (property) {
    styles[property] = value
  }

  // Special case: min-width as fallback for width
  if (normalizedKey === 'min-width' && !styles.width) {
    styles.width = value
  }
}

/**
 * Helper function to parse inline styles from style attribute
 */
function parseInlineStyles(styleString: string): Record<string, string> {
  const styles: Record<string, string> = {}
  if (!styleString) return styles

  const stylePairs = styleString.split(';')
  stylePairs.forEach((pair) => {
    const [key, value] = pair.split(':').map((s) => s.trim())
    if (key && value) {
      const normalizedKey = key.toLowerCase()
      applyStyleValue(normalizedKey, value, styles)
    }
  })

  return styles
}

/**
 * Helper function to apply styles to children
 */
function applyStylesToChildren(childrenNodes: any[], styles: Record<string, string>): any {
  if (Object.keys(styles).length === 0) {
    return childrenNodes.length > 0 ? childrenNodes : null
  }

  if (childrenNodes.length === 0) {
    return { ...styles, text: '' }
  }

  return childrenNodes.map((child) => {
    if (typeof child === 'object' && child.text !== undefined) {
      return { ...child, ...styles }
    }
    return child
  })
}

/**
 * Add converted node to children array
 */
function addConvertedNode(children: any[], converted: any): void {
  if (!converted) return

  if (Array.isArray(converted)) {
    children.push(...converted)
  } else if (typeof converted === 'object' && converted.text !== undefined) {
    children.push(converted)
  } else if (converted.type) {
    children.push(converted)
  }
}

/**
 * Process children of skipped element (data-node-skip)
 */
function processSkippedElementChildren(
  skippedElement: HTMLElement,
  convertNode: (node: Node) => any,
  children: any[],
): void {
  Array.from(skippedElement.childNodes).forEach((grandChild) => {
    const converted = convertNode(grandChild)
    addConvertedNode(children, converted)
  })
}

/**
 * Helper function to process children nodes
 */
function processChildren(element: HTMLElement, convertNode: (node: Node) => any): any[] {
  const children: any[] = []
  Array.from(element.childNodes).forEach((child) => {
    // Skip elements with data-node-skip attribute
    if (
      child.nodeType === Node.ELEMENT_NODE &&
      (child as HTMLElement).dataset.nodeSkip === 'true'
    ) {
      processSkippedElementChildren(child as HTMLElement, convertNode, children)
      return
    }

    const converted = convertNode(child)
    addConvertedNode(children, converted)
  })
  return children
}

/**
 * Helper function to handle inline formatting tags with styles
 */
function handleFormattingTag(children: any[], mark: string, styleString: string): any {
  const styles = parseInlineStyles(styleString)
  const markedChildren = applyMarkToChildren(children, mark)

  if (Object.keys(styles).length > 0) {
    return applyStylesToChildren(
      Array.isArray(markedChildren) ? markedChildren : [markedChildren],
      styles,
    )
  }
  return markedChildren
}

/**
 * Helper function to handle list items
 * @param baseIndent - Base indent from parent ul/ol element (for outer lists only)
 */
function processListItem(
  liElement: HTMLElement,
  listStyleType: string,
  convertNode: (node: Node) => any,
  baseIndent?: number,
): any {
  const liStyle = liElement.getAttribute('style') || ''
  const liStyles = parseInlineStyles(liStyle)

  const liChildren = processChildren(liElement, convertNode)

  // Use baseIndent from ul/ol if available, otherwise default to 1
  const indent = baseIndent ?? 1

  const listItem: any = {
    type: 'p',
    indent,
    listStyleType,
    children: liChildren.length > 0 ? liChildren : [{ text: '' }],
  }

  if (liStyles.color) listItem.color = liStyles.color
  if (liStyles.backgroundColor) listItem.backgroundColor = liStyles.backgroundColor
  if (liStyles.fontSize) listItem.fontSize = liStyles.fontSize
  if (liStyles.fontFamily) listItem.fontFamily = liStyles.fontFamily
  if (liStyles.textAlign) listItem.align = liStyles.textAlign

  return listItem
}

/**
 * Helper function to handle list elements (ul/ol)
 * Returns array of list item nodes
 * @param element - The ul/ol element
 * @param convertNode - Function to convert child nodes
 * @param isNested - Whether this list is nested inside another element (like heading)
 */
function handleList(
  element: HTMLElement,
  convertNode: (node: Node) => any,
  isNested = false,
): any[] {
  const listItems: any[] = []
  const listStyleType = element.tagName.toLowerCase() === 'ul' ? 'disc' : 'decimal'

  // Parse margin-left from ul/ol element to get indent (only for outer lists)
  let baseIndent: number | undefined = undefined
  if (!isNested) {
    const listStyle = element.getAttribute('style') || ''
    const listStyles = parseInlineStyles(listStyle)
    if (listStyles.marginLeft) {
      baseIndent = calculateIndentFromMargin(listStyles.marginLeft)
    }
  }

  Array.from(element.children).forEach((liElement) => {
    if (liElement.tagName.toLowerCase() === 'li') {
      const listItem = processListItem(
        liElement as HTMLElement,
        listStyleType,
        convertNode,
        baseIndent,
      )
      listItems.push(listItem)
    }
  })

  return listItems
}

/**
 * Helper function to check if element contains a list (ul/ol) as direct child
 */
function hasDirectListChild(element: HTMLElement): boolean {
  return Array.from(element.children).some(
    (child) => child.tagName.toLowerCase() === 'ul' || child.tagName.toLowerCase() === 'ol',
  )
}

/**
 * Helper function to extract list from heading element
 * Returns the list element if found, null otherwise
 */
function extractListFromHeading(headingElement: HTMLElement): HTMLElement | null {
  const listElement = Array.from(headingElement.children).find(
    (child) => child.tagName.toLowerCase() === 'ul' || child.tagName.toLowerCase() === 'ol',
  ) as HTMLElement | undefined

  return listElement || null
}

/**
 * Helper function to parse width from CSS style value
 * @param widthValue - CSS width value (e.g., "120px", "240px")
 * @returns width in pixels as number, or undefined
 */
function parseWidthFromStyle(widthValue: string | undefined): number | undefined {
  if (!widthValue) return undefined

  // Extract numeric value from width string (e.g., "120px" -> 120)
  const regex = /^(\d+(?:\.\d+)?)px$/
  const match = regex.exec(widthValue)
  if (!match) return undefined

  const pixels = Number.parseFloat(match[1])
  if (Number.isNaN(pixels) || pixels < 0) return undefined

  return pixels
}

/**
 * Helper function to parse min-height from CSS style value
 * @param minHeightValue - CSS min-height value (e.g., "50px")
 * @returns min-height in pixels as number, or undefined
 */
function parseMinHeightFromStyle(minHeightValue: string | undefined): number | undefined {
  if (!minHeightValue) return undefined

  // Extract numeric value from min-height string (e.g., "50px" -> 50)
  const regex = /^(\d+(?:\.\d+)?)px$/
  const match = regex.exec(minHeightValue)
  if (!match) return undefined

  const pixels = Number.parseFloat(match[1])
  if (Number.isNaN(pixels) || pixels < 0) return undefined

  return pixels
}

/**
 * Parse and apply colSpan/rowSpan attributes
 */
function parseCellSpanAttributes(cell: HTMLElement, cellNode: any): void {
  const colSpan = cell.getAttribute('colspan')
  if (colSpan) {
    const colSpanNum = Number.parseInt(colSpan, 10)
    if (!Number.isNaN(colSpanNum) && colSpanNum > 1) {
      cellNode.colSpan = colSpanNum
    }
  }

  const rowSpan = cell.getAttribute('rowspan')
  if (rowSpan) {
    const rowSpanNum = Number.parseInt(rowSpan, 10)
    if (!Number.isNaN(rowSpanNum) && rowSpanNum > 1) {
      cellNode.rowSpan = rowSpanNum
    }
  }
}

/**
 * Store width in colSizes array
 */
function storeWidthInColSizes(colSizes: number[], colIndex: number, width: number): void {
  if (colIndex >= 0 && colIndex < colSizes.length) {
    colSizes[colIndex] = width
  } else {
    while (colSizes.length <= colIndex) {
      colSizes.push(0)
    }
    colSizes[colIndex] = width
  }
}

/**
 * Parse and store cell width in colSizes array
 */
function processCellWidth(cellStyles: Record<string, string>, colIndex: number, colSizes: number[]): void {
  if (!cellStyles.width) return

  const width = parseWidthFromStyle(cellStyles.width)
  if (width !== undefined && width > 0) {
    storeWidthInColSizes(colSizes, colIndex, width)
  }
}

/**
 * Parse and apply min-height to cell node
 */
function processCellMinHeight(cellStyles: Record<string, string>, cellNode: any): void {
  if (!cellStyles['min-height']) return

  const minHeight = parseMinHeightFromStyle(cellStyles['min-height'])
  if (minHeight !== undefined && minHeight > 0) {
    cellNode.minHeight = minHeight
  }
}

/**
 * Helper function to handle table cells
 * @param cell - The td/th element
 * @param colIndex - The column index of this cell
 * @param colSizes - Array to collect column widths (will be updated)
 */
function processTableCell(
  cell: HTMLElement,
  convertNode: (node: Node) => any,
  colIndex: number,
  colSizes: number[],
): any {
  const cellStyle = cell.getAttribute('style') || ''
  const cellStyles = parseInlineStyles(cellStyle)
  const cellChildren = processChildren(cell, convertNode)

  const cellNode: any = {
    type: cell.tagName.toLowerCase() === 'th' ? 'th' : 'td',
    children: cellChildren.length > 0 ? cellChildren : [{ text: '' }],
  }

  parseCellSpanAttributes(cell, cellNode)
  processCellWidth(cellStyles, colIndex, colSizes)
  processCellMinHeight(cellStyles, cellNode)
  applyStylesToBlockNode(cellNode, cellStyles)

  return cellNode
}

/**
 * Helper function to handle table rows
 * @param row - The tr element
 * @param convertNode - Function to convert child nodes
 * @param colSizes - Array to collect column widths (will be updated)
 */
function processTableRow(
  row: HTMLElement,
  convertNode: (node: Node) => any,
  colSizes: number[],
): any {
  const cells: any[] = []
  // Track column index as we process cells (accounting for colSpan)
  let colIndex = 0
  Array.from(row.querySelectorAll('td, th')).forEach((cell) => {
    const cellNode = processTableCell(cell as HTMLElement, convertNode, colIndex, colSizes)
    cells.push(cellNode)
    // Increment colIndex by colSpan (or 1 if no colSpan)
    // This ensures we track the correct column index for cells with colSpan
    const colSpan = cellNode.colSpan || 1
    colIndex += colSpan
  })
  return {
    type: 'tr',
    children: cells,
  }
}

/**
 * Helper function to handle table elements
 * Parses colSizes from cell widths and stores on table node
 */
function handleTable(element: HTMLElement, convertNode: (node: Node) => any): any {
  const rows: any[] = []
  // Array to collect column widths from all cells
  // colSizes is stored on table node and contains column widths after resizing
  const colSizes: number[] = []

  Array.from(element.querySelectorAll('tr')).forEach((row) => {
    rows.push(processTableRow(row as HTMLElement, convertNode, colSizes))
  })

  const tableNode: any = {
    type: 'table',
    children: rows,
  }

  // Store colSizes array on table node if we found any column widths
  // Only store if array has at least one non-zero value
  if (colSizes.some((width) => width > 0)) {
    tableNode.colSizes = colSizes
  }

  return tableNode
}

/**
 * Helper function to check if fontSize is using em unit
 */
function isFontSizeInEm(fontSize: string): boolean {
  if (!fontSize) return false
  // Check if fontSize ends with 'em' (case insensitive)
  return /em$/i.test(fontSize.trim())
}

/**
 * Helper function to check if node type is heading
 */
function isHeadingType(type: string): boolean {
  return ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(type)
}

/**
 * Helper function to apply styles to block node
 */
function applyStylesToBlockNode(node: any, styles: Record<string, string>): void {
  if (styles.color) node.color = styles.color
  if (styles.backgroundColor) node.backgroundColor = styles.backgroundColor

  // Don't parse fontSize for heading tags if it's using em unit
  if (styles.fontSize) {
    const isHeading = isHeadingType(node.type)
    const isEmUnit = isFontSizeInEm(styles.fontSize)

    // Only apply fontSize if NOT (heading AND em unit)
    if (!(isHeading && isEmUnit)) {
      node.fontSize = styles.fontSize
    }
  }

  if (styles.fontFamily) node.fontFamily = styles.fontFamily

  // Parse text-align to align property
  if (styles.textAlign) {
    node.align = styles.textAlign
  }

  // Parse indent from margin-left (only for outer block elements)
  if (styles.marginLeft) {
    const indent = calculateIndentFromMargin(styles.marginLeft, false, node.type)
    if (indent !== undefined) {
      node.indent = indent
    }
  }
}

/**
 * Helper function to handle heading with list inside
 */
function handleHeadingWithList(
  tagName: string,
  element: HTMLElement,
  styles: Record<string, string>,
  convertNode: (node: Node) => any,
) {
  const listElement = extractListFromHeading(element)
  if (!listElement) return null

  // Parse the list and create heading node with listStyleType
  // Mark as nested since it's inside heading
  const listItems = handleList(listElement, convertNode, true)
  if (listItems.length === 0) return null

  // Use first list item's listStyleType and indent
  const firstListItem = listItems[0]
  const listStyleType = listElement.tagName.toLowerCase() === 'ul' ? 'disc' : 'decimal'

  // Create heading node with listStyleType
  // Flatten children from all list items
  const headingChildren = listItems.flatMap((item) => item.children || [{ text: '' }])

  // Hack: For h1/h2 headings with lists, parse 40px as indent 1
  let indent = firstListItem.indent || 1
  const isH1OrH2 = tagName === 'h1' || tagName === 'h2'
  if (isH1OrH2 && styles.marginLeft) {
    const parsedIndent = calculateIndentFromMargin(styles.marginLeft, true, tagName)
    if (parsedIndent !== undefined) {
      indent = parsedIndent
    }
  }

  const headingNode: any = {
    type: tagName,
    listStyleType,
    indent,
    children: headingChildren,
  }
  applyStylesToBlockNode(headingNode, styles)
  return headingNode
}

/**
 * Handle paragraph or div element
 */
function handleParagraphOrDiv(children: any[], styles: Record<string, string>): any {
  const blockNode: any = {
    type: 'p',
    children: children.length > 0 ? children : [{ text: '' }],
  }
  applyStylesToBlockNode(blockNode, styles)
  return blockNode
}

/**
 * Handle heading element (with or without list)
 */
function handleHeadingElement(
  tagName: string,
  element: HTMLElement,
  children: any[],
  styles: Record<string, string>,
  convertNode: (node: Node) => any,
): any {
  if (hasDirectListChild(element)) {
    const headingWithList = handleHeadingWithList(tagName, element, styles, convertNode)
    if (headingWithList) {
      return headingWithList
    }
  }

  const blockNode: any = {
    type: tagName,
    children: children.length > 0 ? children : [{ text: '' }],
  }
  applyStylesToBlockNode(blockNode, styles)
  return blockNode
}

/**
 * Helper function to handle block elements
 */
function handleBlockElement(
  tagName: string,
  element: HTMLElement,
  children: any[],
  convertNode: (node: Node) => any,
): any {
  const style = element.getAttribute('style') || ''
  const styles = parseInlineStyles(style)

  if (tagName === 'p' || tagName === 'div') {
    return handleParagraphOrDiv(children, styles)
  }

  if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) {
    return handleHeadingElement(tagName, element, children, styles, convertNode)
  }

  return null
}

/**
 * Helper function to handle inline formatting elements
 */
function handleInlineFormatting(tagName: string, element: HTMLElement, children: any[]): any {
  const formattingMap: Record<string, string> = {
    strong: 'bold',
    b: 'bold',
    em: 'italic',
    i: 'italic',
    u: 'underline',
    s: 'strikethrough',
    strike: 'strikethrough',
  }

  const mark = formattingMap[tagName]
  if (mark) {
    const style = element.getAttribute('style') || ''
    return handleFormattingTag(children, mark, style)
  }

  return null
}

/**
 * Helper function to handle special inline elements
 */
function handleSpecialInline(tagName: string, element: HTMLElement, children: any[]): any {
  if (tagName === 'span') {
    const style = element.getAttribute('style') || ''
    const styles = parseInlineStyles(style)
    return applyStylesToChildren(children, styles)
  }

  if (tagName === 'a') {
    const href = element.getAttribute('href') || ''
    return {
      type: 'a',
      url: href,
      children: children.length > 0 ? children : [{ text: '' }],
    }
  }

  if (tagName === 'img') {
    const src = element.getAttribute('src') || ''
    const width = element.getAttribute('width')
    const height = element.getAttribute('height')
    return {
      type: 'img',
      url: src,
      width: width ? Number.parseInt(width, 10) : undefined,
      height: height ? Number.parseInt(height, 10) : undefined,
      children: [],
    }
  }

  return null
}

/**
 * Helper function to handle element nodes
 */
function handleElementNode(element: HTMLElement, convertNode: (node: Node) => any): any {
  // Skip elements with data-node-skip attribute
  // Instead, return their children directly
  if (element.dataset.nodeSkip === 'true') {
    const children = processChildren(element, convertNode)
    // Return children as array if multiple, or single child, or null
    if (children.length === 0) {
      return null
    }
    if (children.length === 1) {
      return children[0]
    }
    return children
  }

  const tagName = element.tagName.toLowerCase()
  const children = processChildren(element, convertNode)

  // Handle block elements
  const blockResult = handleBlockElement(tagName, element, children, convertNode)
  if (blockResult) return blockResult

  // Handle inline formatting
  const formattingResult = handleInlineFormatting(tagName, element, children)
  if (formattingResult) return formattingResult

  // Handle special inline elements
  const inlineResult = handleSpecialInline(tagName, element, children)
  if (inlineResult) return inlineResult

  // Handle lists
  if (tagName === 'ul' || tagName === 'ol') {
    return handleList(element, convertNode)
  }

  // Handle tables
  if (tagName === 'table') {
    return handleTable(element, convertNode)
  }

  // For other elements, return children
  return children.length > 0 ? children : null
}

/**
 * Default empty paragraph value
 */
const DEFAULT_PARAGRAPH: Value = [
  {
    children: [{ text: '' }],
    type: 'p',
  },
]

/**
 * Helper to get meaningful children (ignore whitespace text nodes)
 */
function getMeaningfulChildren(parent: HTMLElement): ChildNode[] {
  return Array.from(parent.childNodes).filter((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      return (node.textContent || '').trim().length > 0
    }
    return node.nodeType === Node.ELEMENT_NODE
  })
}

/**
 * Check if element is o-editor wrapper div
 */
function isOEditorWrapper(element: HTMLElement): boolean {
  return (
    element.tagName.toLowerCase() === 'div' && element.classList.contains('o-editor')
  )
}

/**
 * Convert meaningful children nodes to Value array
 */
function convertChildrenToValue(
  parent: HTMLElement,
  convertNode: (node: Node) => any,
): Value {
  const result: Value = []
  getMeaningfulChildren(parent).forEach((node) => {
    const converted = convertNode(node)
    if (converted) {
      if (Array.isArray(converted)) {
        result.push(...converted)
      } else {
        result.push(converted)
      }
    }
  })
  return result.length > 0 ? result : DEFAULT_PARAGRAPH
}

/**
 * Helper function to convert body children to Slate nodes
 */
function convertBodyToValue(body: HTMLElement, convertNode: (node: Node) => any): Value {
  const meaningfulChildren = getMeaningfulChildren(body)

  if (
    meaningfulChildren.length === 1 &&
    meaningfulChildren[0].nodeType === Node.ELEMENT_NODE &&
    isOEditorWrapper(meaningfulChildren[0] as HTMLElement)
  ) {
    const oEditorDiv = meaningfulChildren[0] as HTMLElement
    return convertChildrenToValue(oEditorDiv, convertNode)
  }

  return convertChildrenToValue(body, convertNode)
}

/**
 * Create convertNode function for recursive conversion
 */
function createConvertNode(): (node: Node) => any {
  const convertNode = (node: Node): any => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || ''
      return text ? { text } : null
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      return handleElementNode(node as HTMLElement, convertNode)
    }

    return null
  }
  return convertNode
}

/**
 * Parse HTML string to PlateJS Value format
 */
export function parseHtmlToValue(htmlString: string): Value {
  if (!htmlString?.trim()) {
    return DEFAULT_PARAGRAPH
  }

  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlString, 'text/html')
    const body = doc.body

    const convertNode = createConvertNode()

    // Check if root element is div with class o-editor and skip it
    const bodyChildren = Array.from(body.children)
    if (bodyChildren.length > 0) {
      const rootElement = bodyChildren[0] as HTMLElement
      if (isOEditorWrapper(rootElement)) {
        return convertChildrenToValue(rootElement, convertNode)
      }
    }

    return convertBodyToValue(body, convertNode)
  } catch (error) {
    console.error('Error parsing HTML:', error)
    return DEFAULT_PARAGRAPH
  }
}
