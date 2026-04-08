import React from 'react'
import {
  BgColorsOutlined,
  ArrowDownOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ArrowUpOutlined,
  DeleteOutlined,
  CloseOutlined,
  MergeCellsOutlined,
  SplitCellsOutlined,
  TableOutlined,
} from '@ant-design/icons'
import { Button, Divider, Popover, Flex, Tooltip } from 'antd'
import {
  type ResizeHandle as ResizeHandlePrimitive,
  useResizeHandle,
  useResizeHandleState,
} from '@platejs/resizable'
import {
  TableProvider,
  useTableBordersDropdownMenuContentState,
  useTableCellElement,
  useTableCellElementResizable,
  useTableElement,
  useTableMergeState,
  TablePlugin,
} from '@platejs/table/react'
import {
  type PlateElementProps,
  PlateElement,
  // useComposedRef,
  useEditorPlugin,
  useEditorRef,
  useEditorSelector,
  useElement,
  useFocusedLast,
  usePluginOption,
  useReadOnly,
  useRemoveNodeButton,
  useSelected,
  withHOC,
} from 'platejs/react'
// import { useElementSelector } from 'platejs/react'
import { type TTableElement, type TTableCellElement, type TTableRowElement } from 'platejs'
import { setCellBackground } from '@platejs/table'
import cn from 'classnames'

import Text from 'src/lib/components/Text'
import useLocale from '../../../locales/useLocale'
import { ColorPickerButton } from '../components/color-picker-button'
import styles from './table-nodes.module.less'

// ResizeHandle component for table cells
function TableResizeHandle({
  options,
  style,
  ...props
}: React.ComponentProps<typeof ResizeHandlePrimitive> & {
  style?: React.CSSProperties
}) {
  const state = useResizeHandleState(options ?? {})
  const resizeHandle = useResizeHandle(state)

  if (state.readOnly) return null

  return <div style={style} data-resizing={state.isResizing} {...resizeHandle.props} {...props} />
}

// Table Element Component with TableProvider and floating toolbar
export const TableElement = withHOC(
  TableProvider,
  function TableElement({ children, ...props }: PlateElementProps<TTableElement>) {
    const { props: tableProps } = useTableElement()

    return (
      <PlateElement {...props}>
        <TableFloatingToolbar>
          {
            <div style={{ position: 'relative', width: 'fit-content' }}>
              <table
                {...(tableProps || {})}
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                }}>
                <tbody>{children}</tbody>
              </table>
            </div>
          }
        </TableFloatingToolbar>
      </PlateElement>
    )
  },
)

// Floating toolbar for table operations
function TableFloatingToolbar({ children }: Readonly<{ children: React.ReactNode }>) {
  const { tf } = useEditorPlugin(TablePlugin)
  const editor = useEditorRef()
  const selected = useSelected()
  const element = useElement<TTableElement>()
  const { props: buttonProps } = useRemoveNodeButton({ element })
  const collapsedInside = useEditorSelector(
    (editor) => selected && editor.api.isCollapsed(),
    [selected],
  )
  const isFocusedLast = useFocusedLast()

  const { canMerge, canSplit } = useTableMergeState()
  const [open, setOpen] = React.useState(false)
  const [t] = useLocale('PlateEditor')

  const shouldShow = isFocusedLast && (canMerge || canSplit || collapsedInside)

  React.useEffect(() => {
    setOpen(shouldShow)
  }, [shouldShow])

  const toolbarContent = (
    <Flex style={{ padding: '4px' }} align="center">
      {/* <TableBordersMenu /> */}
      {selected && <TableBackgroundColorMenu />}
      {canMerge && (
        <Tooltip title={t.table.mergeCells}>
          <Button
            type="text"
            size="small"
            icon={<MergeCellsOutlined />}
            onClick={() => {
              tf.table.merge()
              setOpen(false)
            }}
            onMouseDown={(e) => e.preventDefault()}
          />
        </Tooltip>
      )}

      {(selected || canMerge) && (canSplit || collapsedInside) && <Divider type="vertical" />}

      {canSplit && (
        <Tooltip title={t.table.splitCell}>
          <Button
            type="text"
            size="small"
            icon={<SplitCellsOutlined />}
            onClick={() => {
              tf.table.split()
              setOpen(false)
            }}
            onMouseDown={(e) => e.preventDefault()}
          />
        </Tooltip>
      )}

      {collapsedInside && (
        <>
          <Tooltip title={t.table.insertRowBefore}>
            <Button
              type="text"
              size="small"
              icon={<ArrowUpOutlined />}
              onClick={() => {
                tf.insert.tableRow({ before: true })
              }}
              onMouseDown={(e) => e.preventDefault()}
            />
          </Tooltip>
          <Tooltip title={t.table.insertRowAfter}>
            <Button
              type="text"
              size="small"
              icon={<ArrowDownOutlined />}
              onClick={() => {
                tf.insert.tableRow()
              }}
              onMouseDown={(e) => e.preventDefault()}
            />
          </Tooltip>
          <Tooltip title={t.table.deleteRow}>
            <Button
              type="text"
              size="small"
              icon={<CloseOutlined />}
              onClick={() => {
                tf.remove.tableRow()
              }}
              onMouseDown={(e) => e.preventDefault()}
            />
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip title={t.table.insertColumnBefore}>
            <Button
              type="text"
              size="small"
              icon={<ArrowLeftOutlined />}
              onClick={() => {
                tf.insert.tableColumn({ before: true })
              }}
              onMouseDown={(e) => e.preventDefault()}
            />
          </Tooltip>
          <Tooltip title={t.table.insertColumnAfter}>
            <Button
              type="text"
              size="small"
              icon={<ArrowRightOutlined />}
              onClick={() => {
                tf.insert.tableColumn()
              }}
              onMouseDown={(e) => e.preventDefault()}
            />
          </Tooltip>
          <Tooltip title={t.table.deleteColumn}>
            <Button
              type="text"
              size="small"
              icon={<CloseOutlined />}
              onClick={() => {
                tf.remove.tableColumn()
              }}
              onMouseDown={(e) => e.preventDefault()}
            />
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip title={t.table.deleteTable}>
            <Button
              type="text"
              size="small"
              icon={<DeleteOutlined />}
              {...buttonProps}
              onMouseDown={(e) => e.preventDefault()}
            />
          </Tooltip>
        </>
      )}
    </Flex>
  )

  return (
    <Popover
      content={toolbarContent}
      open={open}
      styles={{
        body: {
          padding: 0,
        },
      }}
      arrow={false}
      getPopupContainer={() => {
        return document.getElementById(editor?.id)?.parentElement
          || document.querySelector('.editor-content')?.parentElement
      }}
      placement="bottom">
      {children}
    </Popover>
  )
}

// Table borders menu
export function TableBordersMenu() {
  const {
    getOnSelectTableBorder,
    hasBottomBorder,
    hasLeftBorder,
    hasNoBorders,
    hasOuterBorders,
    hasRightBorder,
    hasTopBorder,
  } = useTableBordersDropdownMenuContentState()
  const [t] = useLocale('PlateEditor')

  const menuItems = [
    {
      key: 'top',
      label: t.table.borders.top,
      checked: hasTopBorder,
      onChange: getOnSelectTableBorder('top'),
    },
    {
      key: 'right',
      label: t.table.borders.right,
      checked: hasRightBorder,
      onChange: getOnSelectTableBorder('right'),
    },
    {
      key: 'bottom',
      label: t.table.borders.bottom,
      checked: hasBottomBorder,
      onChange: getOnSelectTableBorder('bottom'),
    },
    {
      key: 'left',
      label: t.table.borders.left,
      checked: hasLeftBorder,
      onChange: getOnSelectTableBorder('left'),
    },
    { type: 'divider' },
    {
      key: 'none',
      label: t.table.borders.none,
      checked: hasNoBorders,
      onChange: getOnSelectTableBorder('none'),
    },
    {
      key: 'outer',
      label: t.table.borders.outside,
      checked: hasOuterBorders,
      onChange: getOnSelectTableBorder('outer'),
    },
  ]

  return (
    <Popover
      content={
        <div style={{ padding: '4px' }}>
          {menuItems.map((item) => {
            if (item.type === 'divider') {
              return (
                <div key="divider" style={{ borderTop: '1px solid #d9d9d9', margin: '4px 0' }} />
              )
            }
            return (
              <Text
                key={item.key}
                style={{
                  padding: '4px 8px',
                  cursor: 'pointer',
                  backgroundColor: item.checked ? '#e6f7ff' : 'transparent',
                }}
                onClick={() => {
                  if (item.onChange) {
                    // getOnSelectTableBorder returns a function that takes no arguments
                    item.onChange()
                  }
                }}>
                {item.label}
              </Text>
            )
          })}
        </div>
      }
      trigger="click"
      placement="bottom">
      <Tooltip title={t.table.cellBorders}>
        <Button type="text" size="small" icon={<TableOutlined />} />
      </Tooltip>
    </Popover>
  )
}

// Table background color menu
export function TableBackgroundColorMenu() {
  const editor = useEditorRef()
  const selectedCells = usePluginOption(TablePlugin, 'selectedCells')
  const [t] = useLocale('PlateEditor')

  // Get current background color from selected cells or from cell containing cursor
  const currentColor = useEditorSelector(
    (editor) => {
      try {
        // First, try to get color from selected cells
        if (selectedCells && Array.isArray(selectedCells) && selectedCells.length > 0) {
          const color = selectedCells[0].background || '#ffffff'
          for (const cell of selectedCells) {
            if (cell.background) {
              return cell.background
            }
          }
          return color
        }

        // If no selected cells, try to find the cell containing the cursor
        const { selection } = editor
        if (selection) {
          // Find the table cell node that contains the selection
          const cellMatch = editor.api.above({
            match: (n) => {
              const node = n as any
              return node.type === 'td' || node.type === 'th'
            },
          })

          if (cellMatch) {
            const [cellNode] = cellMatch
            const cell = cellNode as TTableCellElement
            return cell.background || undefined
          }
        }
      } catch (error) {
        console.error('Error getting current color:', error)
      }

      return '#ffffff'
    },
    [selectedCells],
  )

  const onUpdateColor = React.useCallback(
    (color: string) => {
      setCellBackground(editor, { color, selectedCells: selectedCells ?? [] })
    },
    [selectedCells, editor],
  )

  return (
    <ColorPickerButton
      onChange={onUpdateColor}
      value={currentColor as string}
      placement="bottomLeft"
      allowClear>
      <Tooltip title={t.table.backgroundColor}>
        <Button type="text" size="small" icon={<BgColorsOutlined />} />
      </Tooltip>
    </ColorPickerButton>
  )
}

// Table Row Element Component
export function TableRowElement({
  attributes,
  children,
  ...props
}: PlateElementProps<TTableRowElement>) {
  return (
    <tr
      {...attributes}
      {...props}
      style={{
        borderBottom: '1px solid #d9d9d9',
      }}>
      {children}
    </tr>
  )
}

// Table Cell Element Component with resize handles
export function TableCellElement({
  isHeader,
  ...props
}: PlateElementProps<TTableCellElement> & {
  isHeader?: boolean
}) {
  const { api } = useEditorPlugin(TablePlugin)
  const readOnly = useReadOnly()
  const element = props.element

  const { borders, colIndex, colSpan, minHeight, rowIndex, selected, width } = useTableCellElement()

  const { rightProps } = useTableCellElementResizable({
    colIndex,
    colSpan,
    rowIndex,
  })

  // Build border styles from borders object
  const borderStyles: React.CSSProperties = {}
  if (borders.top?.size) {
    borderStyles.borderTop = `${borders.top.size}px solid ${borders.top.color || '#d9d9d9'}`
  }
  if (borders.right?.size) {
    borderStyles.borderRight = `${borders.right.size}px solid ${borders.right.color || '#d9d9d9'}`
  }
  if (borders.bottom?.size) {
    borderStyles.borderBottom = `${borders.bottom.size}px solid ${borders.bottom.color || '#d9d9d9'}`
  }
  if (borders.left?.size) {
    borderStyles.borderLeft = `${borders.left.size}px solid ${borders.left.color || '#d9d9d9'}`
  }

  // Default borders if none specified
  if (Object.keys(borderStyles).length === 0) {
    borderStyles.border = '1px solid #d9d9d9'
  }

  const Tag = isHeader ? 'th' : 'td'
  return (
    <Tag
      {...(props.attributes || {})}
      {...props}
      colSpan={api.table.getColSpan(element)}
      rowSpan={api.table.getRowSpan(element)}
      style={{
        ...borderStyles,
        padding: '8px',
        minWidth: width || 120,
        maxWidth: width || 240,
        backgroundColor:
          element.background || element.backgroundColor || (isHeader ? '#fafafa' : 'transparent'),
        position: 'relative',
        verticalAlign: 'top',
      } as React.CSSProperties}
      className={cn(selected && styles.tableCellSelected)}>
      <div
        style={{
          position: 'relative',
          minHeight: minHeight || 'auto',
          padding: '0',
          height: '100%',
        }}>
        {props.children}
      </div>

      {!readOnly && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            zIndex: 10,
          }}
          contentEditable={false}
          suppressContentEditableWarning={true}>
          {/* Right resize handle */}
          {rightProps && (
            <TableResizeHandle
              {...rightProps}
              data-col={colIndex}
              style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                width: '8px',
                height: 'calc(100% + 8px)',
                cursor: 'col-resize',
                pointerEvents: 'all',
                zIndex: 20,
              }}
            />
          )}
        </div>
      )}
    </Tag>
  )
}

// Table Cell Header Element Component
export function TableCellHeaderElement(props: PlateElementProps<TTableCellElement>) {
  return <TableCellElement {...props} isHeader />
}
