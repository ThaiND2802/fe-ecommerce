import { TrailingBlockPlugin } from 'platejs'
import {
  H1Plugin,
  H2Plugin,
  H3Plugin,
  H4Plugin,
  H5Plugin,
  H6Plugin,
  BoldPlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  UnderlinePlugin,
} from '@platejs/basic-nodes/react'
import { IndentPlugin } from '@platejs/indent/react'
import { ListPlugin } from '@platejs/list/react'
import { LinkPlugin } from '@platejs/link/react'
import { ImagePlugin } from '@platejs/media/react'
import {
  BaseTableCellHeaderPlugin,
  BaseTableCellPlugin,
  BaseTablePlugin,
  BaseTableRowPlugin,
} from '@platejs/table'
import { ParagraphPlugin } from 'platejs/react'
import {
  BaseFontBackgroundColorPlugin,
  BaseFontColorPlugin,
  BaseFontFamilyPlugin,
  BaseFontSizePlugin,
  BaseTextAlignPlugin,
} from '@platejs/basic-styles'

import {
  H1Element,
  H2Element,
  H3Element,
  H4Element,
  H5Element,
  H6Element,
} from './nodes/heading-node'
import { ParagraphElement } from './nodes/paragraph-node'
import {
  TableCellElement,
  TableCellHeaderElement,
  TableElement,
  TableRowElement,
} from './nodes/table-nodes'
import { LinkElement } from './nodes/link-node'
import { ImageElement } from './nodes/image-node'
import { BlockList } from './nodes/list-node'
import {
  BASE_FONT_KIT_OPTION,
  INDENT_AND_LIST_TARGET_PLUGINS,
  TEXT_ALIGN_CONFIG,
  HEADING_BREAK_RULE,
  HEADING_SHORTCUTS,
  STRIKETHROUGH_SHORTCUT,
  INDENT_SIZE,
} from './config'
import { StripFontFamilyPlugin } from './plugins/normalize-font'

const blocksKit = [
  ParagraphPlugin.withComponent(ParagraphElement),
  H1Plugin.configure({
    node: {
      component: H1Element,
    },
    rules: {
      break: HEADING_BREAK_RULE,
    },
    shortcuts: HEADING_SHORTCUTS.h1,
  }),
  H2Plugin.configure({
    node: {
      component: H2Element,
    },
    rules: {
      break: HEADING_BREAK_RULE,
    },
    shortcuts: HEADING_SHORTCUTS.h2,
  }),
  H3Plugin.configure({
    node: {
      component: H3Element,
    },
    rules: {
      break: HEADING_BREAK_RULE,
    },
    shortcuts: HEADING_SHORTCUTS.h3,
  }),
  H4Plugin.configure({
    node: {
      component: H4Element,
    },
    rules: {
      break: HEADING_BREAK_RULE,
    },
    shortcuts: HEADING_SHORTCUTS.h4,
  }),
  H5Plugin.configure({
    node: {
      component: H5Element,
    },
    rules: {
      break: HEADING_BREAK_RULE,
    },
    shortcuts: HEADING_SHORTCUTS.h5,
  }),
  H6Plugin.configure({
    node: {
      component: H6Element,
    },
    rules: {
      break: HEADING_BREAK_RULE,
    },
    shortcuts: HEADING_SHORTCUTS.h6,
  }),
]

const BaseFontKit = [
  BaseFontColorPlugin.configure(BASE_FONT_KIT_OPTION),
  BaseFontBackgroundColorPlugin.configure(BASE_FONT_KIT_OPTION),
  BaseFontSizePlugin.configure(BASE_FONT_KIT_OPTION),
  BaseFontFamilyPlugin.configure(BASE_FONT_KIT_OPTION),
]

const marksKit = [
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
  StrikethroughPlugin.configure({
    shortcuts: STRIKETHROUGH_SHORTCUT,
  }),
]

const listKit = [
  IndentPlugin.configure({
    inject: {
      targetPlugins: INDENT_AND_LIST_TARGET_PLUGINS,
    },
    options: {
      // Standard indent offset: 30px per indent level
      // Note: For h1/h2 headings with lists, the first indent uses 40px instead
      // This special case is handled in serialize-html.ts and parse-html.ts
      // (see H1H2_INDENT_SIZE constant)
      offset: INDENT_SIZE,
    },
  }),
  ListPlugin.configure({
    inject: {
      targetPlugins: INDENT_AND_LIST_TARGET_PLUGINS,
    },
    render: {
      belowNodes: BlockList,
    },
  }),
]

const linkKit = [
  LinkPlugin.configure({
    node: {
      component: LinkElement,
      // Keep link as inline for text, but we'll handle images specially
    },
    options: {
      isUrl: (text: string) => {
        if (/^\[.+\]$/.test(text)) return true
        return /^(https?:\/\/.+|mailto:.+|tel:.+)/i.test(text ?? '')
      },
    },
  }),
]

const imageKit = [
  ImagePlugin.withComponent(ImageElement).configure({
    node: {
      isInline: true, // Make image inline-void so it can be inside inline link
      isVoid: true, // Image is void element
    },
  }),
]

const tableKit = [
  BaseTablePlugin.withComponent(TableElement),
  BaseTableRowPlugin.withComponent(TableRowElement),
  BaseTableCellPlugin.withComponent(TableCellElement),
  BaseTableCellHeaderPlugin.withComponent(TableCellHeaderElement),
]

const BaseAlignKit = [BaseTextAlignPlugin.configure(TEXT_ALIGN_CONFIG)]

export const BaseEditorKit = [
  StripFontFamilyPlugin,
  ...blocksKit,
  ...marksKit,
  ...listKit,
  ...linkKit,
  ...imageKit,
  ...tableKit,
  ...BaseFontKit,
  ...BaseAlignKit,
  TrailingBlockPlugin,
]
