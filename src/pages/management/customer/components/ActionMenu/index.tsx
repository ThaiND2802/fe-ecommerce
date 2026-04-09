import { Dropdown } from 'antd'
import { MoreIcon } from 'src/lib/components/ActionIcon'
import IconSax from 'src/lib/components/IconSax'
import Icon from 'src/lib/components/Icon'
import emitter, { EVENTS } from '../../action'
import useLocaleGroup from 'src/locales/useLocaleGroup'

const Index = ({ id, title }: { id: string, title: string }) => {
  const [t] = useLocaleGroup('customer')

  return (
    <Dropdown
      overlayStyle={{
        minWidth: 120,
      }}
      menu={{
        items: [
          {
            key: 'edit',
            label: t.button.edit,
            icon: <IconSax name="edit-1" size={18} />,
            onClick: () => {
              emitter.emit(EVENTS.UPDATE, { id })
            },
          },
          {
            key: 'delete',
            label: t.button.delete,
            icon: <Icon name="delete" size={18} />,
            onClick: () => {
              emitter.emit(EVENTS.DELETE, { id, title })
            },
          },
        ],
      }}
      trigger={['click']}>
      <MoreIcon />
    </Dropdown>
  )
}

export default Index
