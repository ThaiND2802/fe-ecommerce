import { KEYS, SlatePluginConfig } from 'platejs'

/**
 * Indent configuration
 * 1 indent = 30px
 */
export const INDENT_SIZE = 30 // pixels per indent level
export const H1H2_INDENT_SIZE = 40 // pixels per indent level

/**
 * Editor wrapper styles - customize these CSS properties for the o-editor div
 */
export const EDITOR_WRAPPER_STYLES: Record<string, string> = {
  color: '#363a4a',
  'font-family':
    'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
  'font-size': '14px',
  'line-height': '1.6',
}

/**
 * Link color
 */
export const LINK_COLOR = '#1677ff'

/**
 * Table configuration
 */
export const DEFAULT_TABLE_CELL_MIN_WIDTH = 120 // pixels - minimum width for table cells without explicit width
export const TABLE_BORDER_COLOR = '#d9d9d9'
export const TABLE_BORDER_WIDTH = '1px'
export const TABLE_BORDER = `${TABLE_BORDER_WIDTH} solid ${TABLE_BORDER_COLOR}`
export const TABLE_CELL_PADDING = '8px'
export const TABLE_MARGIN = '8px 0'
export const TABLE_HEADER_BACKGROUND_COLOR = '#fafafa'
export const TABLE_HEADER_FONT_WEIGHT = 'bold'

/**
 * Empty paragraph styling
 */
export const EMPTY_PARAGRAPH_LINE_HEIGHT = 1.6
export const EMPTY_PARAGRAPH_DEFAULT_FONT_SIZE = 14 // pixels - matches EDITOR_WRAPPER_STYLES font-size

/**
 * Configuration for font plugins (color, background-color, font-size, font-family)
 * Applied to paragraph nodes only
 */
export const BASE_FONT_KIT_OPTION = {
  inject: { targetPlugins: [KEYS.p] },
} satisfies SlatePluginConfig

/**
 * Target plugins for indent and list features
 * Applied to heading and paragraph nodes
 */
export const INDENT_AND_LIST_TARGET_PLUGINS = [...KEYS.heading, KEYS.p]

/**
 * Configuration for text align plugin
 */
export const TEXT_ALIGN_CONFIG = {
  inject: {
    nodeProps: {
      defaultNodeValue: 'start' as const,
      nodeKey: 'align' as const,
      styleKey: 'textAlign' as const,
      validNodeValues: ['start', 'left', 'center', 'right', 'end', 'justify'],
    },
    targetPlugins: [...KEYS.heading, KEYS.p, KEYS.img, KEYS.mediaEmbed],
  },
}

/**
 * Configuration for heading plugins
 * Common rules and shortcuts for all heading levels
 */
export const HEADING_BREAK_RULE = { empty: 'reset' as const }

/**
 * Keyboard shortcuts for heading toggles
 */
export const HEADING_SHORTCUTS = {
  h1: { toggle: { keys: 'mod+alt+1' } },
  h2: { toggle: { keys: 'mod+alt+2' } },
  h3: { toggle: { keys: 'mod+alt+3' } },
  h4: { toggle: { keys: 'mod+alt+4' } },
  h5: { toggle: { keys: 'mod+alt+5' } },
  h6: { toggle: { keys: 'mod+alt+6' } },
}

/**
 * Keyboard shortcut for strikethrough toggle
 */
export const STRIKETHROUGH_SHORTCUT = { toggle: { keys: 'mod+shift+x' } }

export const FONT_FAMILY_OPTIONS = [
  { value: 'Arial', label: 'Arial' },
  { value: 'Calibri', label: 'Calibri' },
  { value: 'Inter', label: 'Inter' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Helvetica', label: 'Helvetica' },
  { value: 'Open Sans', label: 'Open Sans' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Tahoma', label: 'Tahoma' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Verdana', label: 'Verdana' },
]
