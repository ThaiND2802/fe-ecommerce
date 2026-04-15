import { ChangeEvent } from 'react'

import Button from 'src/lib/components/Button'
import IconSax from 'src/lib/components/IconSax'
import Input from 'src/lib/components/Input'
import PageHeader from 'src/lib/components/PageHeader'
import useLocale from 'src/lib/locales/useLocale'
import { useDebounceFn } from 'src/lib/hooks'
import useLocaleGroup from 'src/locales/useLocaleGroup'
import { useStore } from '../../store'
import ColumnSelect from '../ColumnSelect'
import DataFilter from '../DataFilter'

const Index = () => {
  const [t] = useLocaleGroup('order')
  const [tButton] = useLocale('button')

  const setSearchValue = useStore((state) => state.setSearchValue)
  const toggleFormVisible = useStore((state) => state.toggleFormVisible)

  const updateSearchValue = useDebounceFn((event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }, 500)

  return (
    <PageHeader
      title={t.title.page}
      actions={[
        <Input
          key="search"
          prefix={<IconSax name="search-normal-2" size={20} />}
          style={{ width: 240 }}
          placeholder={`${t.search.placeholder}`}
          allowClear
          onChange={updateSearchValue}
        />,
        <DataFilter key="data-filter" />,
        <ColumnSelect key="columns" />,
        <Button key="add" type="primary" onClick={toggleFormVisible}>
          <IconSax name="add" size={20} />
          {tButton.create}
        </Button>,
      ]}
    />
  )
}

export default Index
