import { HTMLAttributes } from 'react'
import { Flex } from 'antd'
import classNames from 'classnames'

import Collapse from 'src/lib/components/Collapse'

import Ellipsis from '../Ellipsis'
import styles from './index.module.less'

interface CollapseTreeItem {
  key: string
  label: React.ReactNode
  icon?: React.ReactNode
  extra?: React.ReactNode
  children?: CollapseTreeItem[] | React.ReactNode
}

interface CollapseTreeProps extends HTMLAttributes<HTMLDivElement> {
  items: CollapseTreeItem[]
  onItemClick?: (item: CollapseTreeItem) => void
}

const CollapseTree = ({ items, onItemClick }: CollapseTreeProps) => {
  const parseChildrenItem = (item: CollapseTreeItem, lv: number) => {
    return [
      {
        ...item,
        label: item.icon ? (
          <>
            {item.icon}
            <span>{item.label}</span>
          </>
        ) : (
          item.label
        ),
        children:
          Array.isArray(item.children) && item.children.map((child) => renderItem(child, lv + 1)),
      },
    ]
  }

  const renderItem = (item: CollapseTreeItem, lv = 0) => {
    if (item.children) {
      return (
        <Collapse
          className={styles.collapse}
          style={{ '--level': lv } as React.CSSProperties}
          key={item.key}
          items={parseChildrenItem(item, lv)}
          ghost
        />
      )
    }
    return (
      <Flex
        className={classNames(styles.item, `item-lv-${lv}`)}
        key={item.key}
        onClick={() => onItemClick?.(item)}>
        <Flex className={styles.itemContent} style={{ paddingLeft: lv * 12 }}>
          <span style={{ width: 14 }} />
          <span>{item.icon}</span>
          <Ellipsis className={styles.itemLabel}>{item.label as string}</Ellipsis>
          {item.extra ? <span>{item.extra}</span> : null}
        </Flex>
      </Flex>
    )
  }

  return items.map((item) => renderItem(item))
}

export default CollapseTree
