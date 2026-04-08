import { Flex } from 'antd'
import cn from 'classnames'

import { MarkToolbarButton } from './mark-toolbar-button'
import { HeadingDropdown } from './heading-dropdown'
import { ListBulletButton } from './list-bullet-button'
import { ListNumberButton } from './list-number-button'
import { FontFamilyButton } from './font-family-button'
import { FontColorButton } from './font-color-button'
import { FontBackgroundColorButton } from './font-background-color-button'
import { FontSizeButton } from './font-size-button'
import { TextAlignDropdown } from './text-align-dropdown'
import { LinkButton } from './link-button'
import { ImageUploadButton } from './image-upload-button'
import { TableButton } from './table-button'
import MaximizeButton from './maximize-button'
import styles from './toolbar.module.less'

const Toolbar = ({ className }: { className?: string }) => {
  return (
    <Flex className={cn(styles.toolbar, className)} gap={8} align="center">
      <HeadingDropdown />

      <FontFamilyButton />
      <FontSizeButton />

      <MarkToolbarButton nodeType="bold">B</MarkToolbarButton>
      <MarkToolbarButton nodeType="italic">I</MarkToolbarButton>
      <MarkToolbarButton nodeType="underline">U</MarkToolbarButton>
      <MarkToolbarButton nodeType="strikethrough">S</MarkToolbarButton>

      <TextAlignDropdown />
      <ListBulletButton />
      <ListNumberButton />
      <FontColorButton />
      <FontBackgroundColorButton />
      <LinkButton />
      <ImageUploadButton />
      <TableButton />
      <MaximizeButton />
    </Flex>
  )
}

export default Toolbar
