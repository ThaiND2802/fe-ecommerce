import { Dropdown } from 'antd'
import Icon from 'src/lib/components/Icon'
import IconSax from 'src/lib/components/IconSax'
import { MoreIcon } from 'src/lib/components/ActionIcon'
import useLocaleGroup from 'src/locales/useLocaleGroup'
import emitter, { EVENTS } from '../../action'

const Index = ({ id, title }: { id: string; title: string }) => {
  const [t] = useLocaleGroup('user')

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
