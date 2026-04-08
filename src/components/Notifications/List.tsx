import { useRef } from 'react'
import { Button, Skeleton } from 'antd'

import Empty from 'src/components/Empty'
import ScrollContainer from '../ScrollContainer'
import useLocaleGroup from 'src/locales/useLocaleGroup'
import { NotificationTimeGroup } from './type'
import TimeGroup from './TimeGroup'
import { useBottomLoadMore } from 'src/hook/scroll'
import { useUser } from 'src/hook/use-user'

import ModulesStore from 'src/store/modules'

import styles from './List.module.less'

const List = ({
  data,
  hasNextPage = false,
  loading = false,
  viewAll,
  onLoadMore,
}: {
  data: NotificationTimeGroup[]
  hasNextPage?: boolean
  loading?: boolean
  viewAll?: boolean
  onLoadMore?: () => void
}) => {
  const [t] = useLocaleGroup('notifications')
  const scrollRef = useRef<HTMLDivElement>(null)
  const { data: userInfo } = useUser(true)

  useBottomLoadMore({
    ref: scrollRef,
    end: !hasNextPage,
    onLoadMore,
  })

  const handleViewAll = () => {
    const workspaceModule = ModulesStore.value['0014']

    if (workspaceModule) {
      window.open(`${workspaceModule.path_url?.replace('{tenant}', userInfo?.tenant)}`, '_blank')
    }
  }

  const isEmpty = !data?.length || data.every((item) => !item.items.length)

  if (loading && !data?.length) return <Skeleton active style={{ padding: 16 }} />

  if (isEmpty) return <Empty style={{ minHeight: 250 }} />

  return (
    <>
      <ScrollContainer className={styles.list} ref={scrollRef}>
        {data.map((item) => (
          <TimeGroup key={item.title} data={item} />
        ))}
      </ScrollContainer>
      {viewAll && (
        <div className={styles.viewAll}>
          <Button type="primary" className={styles.viewAllButton} onClick={handleViewAll}>
            {t.viewAll}
          </Button>
        </div>
      )}
    </>
  )
}

export default List
