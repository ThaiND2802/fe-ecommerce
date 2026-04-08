import { Activity, useEffect, useMemo } from 'react'
import { Flex, Form, Checkbox, FormInstance, Collapse } from 'antd'

import Button from '../Button'
import Popover, { PopoverProps } from '../Popover'
import SearchPopover from '../SearchPopover'
import { TableColumn } from '../TableColumnSelect'
import ScrollContainer from '../ScrollContainer'
import FormItem from '../FormItem'
import useLocale from '../../locales/useLocale'
import { textSearch } from '../../utils/search'

import { Provider, useContextStore } from './context'
import styles from './index.module.less'
import { useFilterForm } from './hook'

type FilterPopoverTriggerProps = React.ReactNode | ((props: { count: number }) => React.ReactNode)

export interface FilterPopoverProps extends Omit<PopoverProps, 'children'> {
  children?: FilterPopoverTriggerProps
  fields: any
  runtimeFields: TableColumn[]
  onClear?: () => void
  onApply?: (values: any) => void
}

const FilterList = ({ form, fields }: { form: FormInstance; fields: any }) => {
  const [t] = useLocale('FilterPopover')
  const activatedFilterFiles = useContextStore((state) => state.activatedFilterFiles)
  const visibleColumns = useContextStore((state) => state.visibleColumns)
  const hiddenColumns = useContextStore((state) => state.hiddenColumns)
  const searchValue = useContextStore((state) => state.searchValue)
  const setActivatedFilterFiles = useContextStore((state) => state.setActivatedFilterFiles)
  const setSearchValue = useContextStore((state) => state.setSearchValue)

  const toggleFilter = (column: TableColumn, checked: boolean) => {
    setActivatedFilterFiles({ ...activatedFilterFiles, [column.key]: checked })
  }

  const filteredVisibleColumns = useMemo(() => {
    return visibleColumns?.filter((column) => textSearch(column.label, searchValue))
  }, [visibleColumns, searchValue])

  const filteredHiddenColumns = useMemo(() => {
    return hiddenColumns?.filter((column) => textSearch(column.label, searchValue))
  }, [hiddenColumns, searchValue])

  const renderFilterItem = (column: TableColumn) => {
    return (
      <Flex className={styles.fieldItem} key={column.key} vertical>
        <Checkbox
          key={column.key}
          checked={activatedFilterFiles[column.key]}
          onChange={(e) => toggleFilter(column, e.target.checked)}>
          {column.label}
        </Checkbox>

        {activatedFilterFiles[column.key] && (
          <FormItem
            className={styles.fieldInput}
            name={fields[column.key]?.key || column.key}
            autoMargin
            marginBottom={4}>
            {fields[column.key]?.Element}
          </FormItem>
        )}
      </Flex>
    )
  }

  return (
    <ScrollContainer className={styles.content} scrollPadding={16}>
      <Flex className={styles.listHeader}>
        <div className={styles.listLabel}>{t.label.list}</div>{' '}
        <SearchPopover
          searchValue={searchValue}
          inputProps={{ onChange: (e) => setSearchValue(e.target.value) }}
        />
      </Flex>
      <Form form={form} className={styles.form} layout="vertical">
        <Flex vertical gap={8}>
          {filteredVisibleColumns?.map(
            (column) => fields[column.key]?.Element && renderFilterItem(column),
          )}
        </Flex>

        <Activity mode={filteredHiddenColumns.length ? 'visible' : 'hidden'}>
          <Collapse className={styles.hiddenFieldsCollapse} ghost expandIconPosition="end">
            <Collapse.Panel header={t.label.other} key="other">
              <Flex vertical gap={8}>
                {filteredHiddenColumns?.map(
                  (column) => fields[column.key]?.Element && renderFilterItem(column),
                )}
              </Flex>
            </Collapse.Panel>
          </Collapse>
        </Activity>
      </Form>
    </ScrollContainer>
  )
}

const FilterPopoverTrigger = ({ children }: { children: FilterPopoverTriggerProps }) => {
  const filterValues = useContextStore((state) => state.filterValues)
  return typeof children === 'function'
    ? children({ count: Object.keys(filterValues).filter((key) => filterValues[key]).length })
    : children
}

const FilterPopover = ({
  children,
  fields,
  runtimeFields,
  onClear,
  onApply,
  ...props
}: FilterPopoverProps) => {
  const [t] = useLocale('FilterPopover')
  const { form } = useFilterForm()
  const setFilterValues = useContextStore((state) => state.setFilterValues)
  const setActivatedFilterFiles = useContextStore((state) => state.setActivatedFilterFiles)

  const handleApply = () => {
    setFilterValues(form.getFieldsValue())
    onApply?.(form.getFieldsValue())
  }

  const handleClear = () => {
    form.resetFields()
    setFilterValues({})
    setActivatedFilterFiles({})
    onClear?.()
    onApply?.({})
  }

  return (
    <Popover
      classNames={{
        body: styles.popoverBody,
      }}
      title={t.title}
      content={<FilterList form={form} fields={fields} />}
      trigger="click"
      placement="bottomRight"
      arrow={false}
      actions={[
        <Button key="filter" color="default" variant="filled" onClick={handleClear}>
          {t.button.clear}
        </Button>,
        <Button type="primary" key="apply" onClick={handleApply}>
          {t.button.apply}
        </Button>,
      ]}
      closeable={true}
      {...props}>
      <span>
        <FilterPopoverTrigger>{children}</FilterPopoverTrigger>
      </span>
    </Popover>
  )
}

const ColumnVisibleChangeSynchronizer = ({ runtimeFields }: { runtimeFields: TableColumn[] }) => {
  const setVisibleColumns = useContextStore((state) => state.setVisibleColumns)
  const setHiddenColumns = useContextStore((state) => state.setHiddenColumns)

  useEffect(() => {
    const visibleColumns = runtimeFields.filter((c) => c.isMandatory || c.isActive)
    const hiddenColumns = runtimeFields.filter((c) => !c.isMandatory && !c.isActive)

    setVisibleColumns(visibleColumns)
    setHiddenColumns(hiddenColumns)
  }, [runtimeFields])

  return null
}

export default function FilterPopoverWrapper(props: Readonly<FilterPopoverProps>) {
  const { fields, runtimeFields } = props

  const activatedFilterFiles = useMemo(() => {
    const statuses = {}
    for (const key in fields) {
      statuses[key] = false
    }
    return statuses
  }, [fields])

  return (
    <Provider initialState={{ activatedFilterFiles }}>
      <FilterPopover {...props} />
      <ColumnVisibleChangeSynchronizer runtimeFields={runtimeFields} />
    </Provider>
  )
}
