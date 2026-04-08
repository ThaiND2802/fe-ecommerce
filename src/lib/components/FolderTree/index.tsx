import React, { useCallback, useEffect, useRef } from 'react'
import { Tree, TreeProps, Flex } from 'antd'
import type { DataNode } from 'antd/es/tree'
import classNames from 'classnames'

import Icon from 'src/lib/components/Icon'
import styles from './index.module.less'

export interface TreeNode extends DataNode {
  suffix?: React.ReactNode
  level?: number
  extra?: Record<string, any>
  children?: TreeNode[]
}
export interface FolderTreeProps extends TreeProps {
  treeData: TreeNode[]
}

const FolderTree = ({ className, onExpand, onSelect, ...otherProps }: FolderTreeProps) => {
  const ref = useRef(null)

  const attachClass = () => {
    const doAttach = () => {
      const levelItems = ref.current?.querySelectorAll('[data-treenode-title-level]')
      levelItems?.forEach((item) => {
        const level = item.dataset.treenodeTitleLevel
        item.closest('.ant-tree-treenode')?.classList.add(`treenode-level-${level}`)
      })

      const disableSelectItems = ref.current?.querySelectorAll('[data-disable-select="true"]')
      disableSelectItems?.forEach((item) => {
        item.closest('.ant-tree-treenode')?.classList.add(`treenode-disable-select`)
      })
    }
    doAttach()
  }

  const handleExpand = (expandedKeys: string[], info: any) => {
    onExpand?.(expandedKeys, info)
  }

  const handleSelect = (selectedKeys: string[], info: any) => {
    onSelect?.(selectedKeys, info)
  }

  useEffect(() => {
    const observer = new MutationObserver(attachClass)

    observer.observe(ref.current, {
      childList: true,
      subtree: true,
    })

    return () => observer.disconnect()
  }, [])

  const renderTitle = useCallback((node: TreeNode) => {
    const selectable = node.selectable ?? true
    return (
      <Flex
        className={classNames(styles.titleWrapper, `treenode-title-level-${node.level}`)}
        data-treenode-title-level={node.level}
        data-disable-select={(!selectable).toString()}>
        <span className={classNames(styles.itemTitle, 'node-title')}>{node.title as string}</span>
        {node.suffix}
      </Flex>
    )
  }, [])

  return (
    <div ref={ref}>
      <Tree.DirectoryTree
        className={classNames(styles.tree, className)}
        showIcon
        defaultExpandAll
        switcherIcon={<Icon name="arrow-down" size={18} />}
        blockNode
        expandAction={false}
        titleRender={renderTitle}
        onExpand={handleExpand}
        onSelect={handleSelect}
        {...otherProps}
      />
    </div>
  )
}

export default FolderTree
