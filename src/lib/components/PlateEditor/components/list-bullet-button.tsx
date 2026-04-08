import { UnorderedListOutlined } from '@ant-design/icons'
import { ListStyleType } from '@platejs/list'

import { ListButtonBase } from './list-button-base'

export function ListBulletButton() {
  return <ListButtonBase listStyleType={ListStyleType.Disc} icon={<UnorderedListOutlined />} />
}
