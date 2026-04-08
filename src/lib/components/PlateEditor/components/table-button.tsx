import { useState, useCallback } from 'react'
import { TableOutlined } from '@ant-design/icons'
import { Popover } from 'antd'
import { useEditorRef } from 'platejs/react'

import Text from 'src/lib/components/Text'
import useLocale from '../../../locales/useLocale'
import ToolbarButton from './toolbar-button'
import styles from './table-button.module.less'

const MAX_ROWS = 10
const MAX_COLS = 10

function insertTableUsingTfInsert(editor: any, rows: number, cols: number) {
  const tf = editor.tf
  if (tf.insert?.table) {
    tf.insert.table({ rowCount: rows, colCount: cols }, { select: true })
    tf.focus()
  }
}

export function TableButton() {
  const editor = useEditorRef()
  const [open, setOpen] = useState(false)
  const [hoveredRows, setHoveredRows] = useState(0)
  const [hoveredCols, setHoveredCols] = useState(0)
  const [t] = useLocale('PlateEditor')

  const handleInsertTable = useCallback(
    (rows: number, cols: number) => {
      try {
        insertTableUsingTfInsert(editor, rows, cols)
        setOpen(false)
      } catch {
        // Error inserting table - ignore
      }
    },
    [editor],
  )

  const handleCellHover = useCallback((row: number, col: number) => {
    setHoveredRows(row + 1)
    setHoveredCols(col + 1)
  }, [])

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      handleInsertTable(row + 1, col + 1)
    },
    [handleInsertTable],
  )

  const handleMouseLeave = useCallback(() => {
    setHoveredRows(0)
    setHoveredCols(0)
  }, [])

  const content = (
    <Text className={styles.tableGrid} onMouseLeave={handleMouseLeave}>
      {Array.from({ length: MAX_ROWS }, (_, rowIndex) => (
        <div key={rowIndex} className={styles.tableRow}>
          {Array.from({ length: MAX_COLS }, (_, colIndex) => {
            const isHovered = rowIndex < hoveredRows && colIndex < hoveredCols
            return (
              <button
                key={colIndex}
                type="button"
                className={`${styles.tableCell} ${isHovered ? styles.hovered : ''}`}
                onMouseEnter={() => handleCellHover(rowIndex, colIndex)}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                aria-label={t.table.selectTable
                  .replace('{{rows}}', String(rowIndex + 1))
                  .replace('{{cols}}', String(colIndex + 1))}
              />
            )
          })}
        </div>
      ))}
      <div className={styles.tableSize}>
        {hoveredRows > 0 && hoveredCols > 0
          ? `${hoveredRows} x ${hoveredCols}`
          : t.table.selectSize}
      </div>
    </Text>
  )

  return (
    <Popover
      content={content}
      open={open}
      onOpenChange={setOpen}
      trigger="click"
      placement="bottom">
      <ToolbarButton>
        <TableOutlined />
      </ToolbarButton>
    </Popover>
  )
}
