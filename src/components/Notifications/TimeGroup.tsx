import { Flex } from 'antd'

import { NotificationTimeGroup } from './type'
import Item from './Item'

import styles from './TimeGroup.module.less'

const List = ({ data }: { data: NotificationTimeGroup }) => {
  if (!data.items.length) return null

  return (
    <div>
      <div className={styles.title}>{data.title}</div>
      <Flex vertical>
        {data.items.map((item) => (
          <Item key={item.id} data={item} />
        ))}
      </Flex>
    </div>
  )
}

export default List
