import { useCallback, useMemo, useState } from 'react'
import { Button, Flex, Input, Switch } from 'antd'
import classNames from 'classnames'

import { normalizeText } from 'src/lib/utils/normalizeText'
import { useDelayClosePopup } from 'src/lib/hooks'
import { ButtonColumns } from '../Buttons'
import { DrawerWithScroll } from '../Drawer'
import IconSax from '../IconSax'
import DraggableList from '../DraggableList'
import DragHandle from '../DraggableList/handler'
import useLocale from '../../locales/useLocale'

import styles from './index.module.less'

export interface TableColumn {
  key: string
  label: string
  isMandatory?: boolean
  isActive?: boolean
}

export type TableColumnType<T> = TableColumn & {
  key?: keyof T
}

interface ITableColumnSelectProps {
  columns: TableColumn[]
  onChange?: (cols: TableColumn[]) => void
}

const filterByLabel = (columns: TableColumn[], label: string) => {
  return columns.filter((c) =>
    normalizeText(c.label).toLowerCase().includes(normalizeText(label).toLowerCase()),
  )
}

const ColumnItem = ({
  column,
  dragging,
  noHandler,
  onChange,
}: {
  column: TableColumn
  dragging?: boolean
  noHandler?: boolean
  onChange?: (column: TableColumn, checked: boolean) => void
}) => {
  return (
    <Flex className={classNames(styles.columnItemInner, dragging && styles.dragging)}>
      {!noHandler && <DragHandle className={styles.dragHandle} iconSize={18} />}
      <div className={styles.columnItemLabel}>{column.label}</div>
      <Switch
        className={styles.columnItemSwitch}
        checked={column.isMandatory || column.isActive}
        disabled={column.isMandatory}
        size="small"
        onChange={(checked) => {
          onChange?.(column, checked)
        }}
      />
    </Flex>
  )
}

const Index = ({ columns, onChange }: ITableColumnSelectProps) => {
  const [t] = useLocale('TableColumnSelect')
  const [popupVisible, setPopupVisible] = useState(false)
  const { isVisible, close } = useDelayClosePopup({
    state: popupVisible,
    updateState: setPopupVisible,
  })
  const [searchValue, setSearchValue] = useState('')
  const canDrag = useMemo(() => !searchValue.length, [searchValue])

  const activeColumns = columns.filter((c) => c.isMandatory || c.isActive)
  const hiddenColumns = columns.filter((c) => !c.isMandatory && !c.isActive)

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value.trim())
  }

  const handleChange = (cols: TableColumn[]) => {
    onChange?.([...cols, ...hiddenColumns])
  }

  const toggleColumn = useCallback((column: TableColumn, checked: boolean) => {
    const newColumnValue = { ...column, isActive: checked }
    const newActiveColumns = checked
      ? [...activeColumns, newColumnValue]
      : activeColumns.filter((c) => c.key !== column.key)
    const newHiddenColumns = checked
      ? hiddenColumns.filter((c) => c.key !== column.key)
      : [...hiddenColumns, newColumnValue]

    onChange?.([...newActiveColumns, ...newHiddenColumns])
  }, [activeColumns, hiddenColumns, onChange])

  const hideAll = () => {
    onChange?.([
      ...activeColumns.filter((c) => c.isMandatory),
      ...hiddenColumns,
      ...activeColumns.filter((c) => !c.isMandatory).map((c) => ({ ...c, isActive: false })),
    ])
  }

  const renderColumnItem = useCallback(
    (column: TableColumn, dragging: boolean) => {
      return (
        <ColumnItem
          column={column}
          dragging={dragging}
          noHandler={!canDrag}
          onChange={toggleColumn}
        />
      )
    },
    [canDrag],
  )

  return (
    <>
      <ButtonColumns onClick={() => setPopupVisible(true)} />
      <DrawerWithScroll className={styles.drawer} open={isVisible} onClose={close} title={t.title} noPadding>
        <div className={styles.searchInput}>
          <Input
            prefix={<IconSax name="search-2" />}
            placeholder={t.searchPlaceholder}
            allowClear
            onChange={onSearchChange}
          />
        </div>
        <Flex className={styles.section}>
          <div className={styles.sectionTitle}>{t.show}</div>
          <Button className={styles.sectionAction} type="text" onClick={hideAll}>
            {t.hideAll}
          </Button>
        </Flex>
        <DraggableList
          className={styles.columnDraggableList}
          datasource={filterByLabel(activeColumns, searchValue)}
          itemRender={renderColumnItem}
          keyField="key"
          itemClassName={styles.columnItem}
          noHandler
          indicatorOffset={3}
          canDrag={() => canDrag}
          onChange={handleChange}
        />
        <Flex className={styles.section}>
          <div className={styles.sectionTitle}>{t.hidden}</div>
        </Flex>
        <Flex className={styles.columnList}>
          {filterByLabel(hiddenColumns, searchValue).map((column) => (
            <ColumnItem key={column.key} column={column} noHandler onChange={toggleColumn} />
          ))}
        </Flex>
      </DrawerWithScroll>
    </>
  )
}

export default Index
