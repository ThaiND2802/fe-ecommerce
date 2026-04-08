import { useCallback, useState } from 'react'
import { ColorPicker } from 'antd'
import type { Color, ColorPickerProps } from 'antd/es/color-picker'

// Default preset colors - common colors for quick selection
const DEFAULT_PRESET_COLORS: ColorPickerProps['presets'] = [
  {
    label: null,
    colors: [
      '#000000',
      '#ffffff',
      '#6B7280',
      '#1D4ED8',
      '#2563EB',
      '#60A5FA',
      '#166534',
      '#16A34A',
      '#4ADE80',
      '#991B1B',
      '#DC2626',
      '#F97316',
      '#6D28D9',
      '#7C3AED',
      '#A78BFA',
      '#92400E',
    ],
  },
]

interface ColorPickerButtonProps extends Omit<ColorPickerProps, 'onChange'> {
  onChange: (color: string) => void
}

/**
 * Reusable ColorPicker button component
 * Wraps Ant Design ColorPicker with consistent styling and behavior
 */
export function ColorPickerButton({ children, onChange, ...props }: Readonly<ColorPickerButtonProps>) {
  const [open, setOpen] = useState(false)
  const handleColorChange = useCallback(
    (color: Color) => {
      if (color.cleared) {
        onChange(null)
      } else {
        const hexColor = color.toHexString()
        onChange(hexColor)
      }
      setOpen(false)
    },
    [onChange],
  )

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
  }

  return (
    <ColorPicker
      onChange={handleColorChange}
      onOpenChange={handleOpenChange}
      open={open}
      showText
      format="hex"
      trigger="click"
      placement="bottom"
      presets={DEFAULT_PRESET_COLORS}
      {...props}>
      {children}
    </ColorPicker>
  )
}
