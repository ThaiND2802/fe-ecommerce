import { HTMLAttributes, useState } from 'react'
import { Flex } from 'antd'
import classNames from 'classnames'

import Icon from 'src/lib/components/Icon'
import { useResizeDetector } from 'src/lib/hooks/screen'

import styles from './index.module.less'

interface Props<T> extends HTMLAttributes<HTMLDivElement> {
  maxItems: number
  items: T[]
  listClassName?: string
  render: (items: T[]) => React.ReactNode
}

const Index = <T,>({ className, items, maxItems, render, listClassName }: Props<T>) => {
  const { ref } = useResizeDetector({ debounce: 100 })
  const [showLess, setShowLess] = useState(true)

  return (
    <Flex className={classNames(styles.container, className)}>
      <div ref={ref} className={classNames(styles.list, listClassName)}>
        {showLess ? render(items.slice(0, maxItems)) : render(items)}
        {items.length > maxItems && (
          <Flex className={styles.more} onClick={() => setShowLess(!showLess)}>
            {showLess && <span>+{items.length - maxItems} thêm</span>}
            <Icon
              className={classNames({ [styles.rotate]: !showLess })}
              name="arrow-down"
              size={16}
            />
          </Flex>
        )}
      </div>
    </Flex>
  )
}

export default Index
