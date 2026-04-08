import React from 'react'
import { Popover, Button, Tooltip } from 'antd'

import Text from 'src/lib/components/Text'

interface ColorPickerPopoverProps {
  /**
   * Array of color hex codes
   */
  colors: string[]
  /**
   * Callback when a color is selected
   */
  onColorChange: (color: string) => void
  /**
   * Callback to clear the color (optional)
   */
  onClear?: () => void
  /**
   * Whether the popover is open (controlled)
   */
  open?: boolean
  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void
  /**
   * Placement of the popover
   */
  placement?: 'top' | 'bottom' | 'left' | 'right'
  /**
   * Custom trigger button (optional)
   */
  trigger?: React.ReactNode
  /**
   * Title text for the color picker
   */
  title?: string
}

/**
 * Reusable ColorPicker popover component for table cell background
 * Uses a simple color grid instead of Ant Design ColorPicker
 */
export function ColorPickerPopover({
  colors,
  onColorChange,
  onClear,
  open,
  onOpenChange,
  placement = 'bottom',
  trigger,
  title = 'Colors',
}: Readonly<ColorPickerPopoverProps>) {
  const handleColorClick = (color: string) => {
    onColorChange(color)
  }

  const content = (
    <div style={{ padding: '4px', width: '200px' }}>
      <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{title}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
        {colors.map((color) => (
          <Text
            key={color}
            style={{
              width: '24px',
              height: '24px',
              backgroundColor: color,
              border: '1px solid #d9d9d9',
              cursor: 'pointer',
              borderRadius: '4px',
            }}
            onClick={() => handleColorClick(color)}
          />
        ))}
      </div>
      {onClear && (
        <Text
          style={{
            marginTop: '8px',
            padding: '4px 8px',
            cursor: 'pointer',
            borderTop: '1px solid #d9d9d9',
          }}
          onClick={onClear}>
          Clear
        </Text>
      )}
    </div>
  )

  const defaultTrigger = (
    <Tooltip title="Background color">
      <Button type="text" size="small">
        🎨
      </Button>
    </Tooltip>
  )

  return (
    <Popover
      content={content}
      open={open}
      onOpenChange={onOpenChange}
      trigger="click"
      placement={placement}>
      {trigger || defaultTrigger}
    </Popover>
  )
}
