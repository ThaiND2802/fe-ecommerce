import { OrderedListOutlined } from '@ant-design/icons'
import { ListStyleType } from '@platejs/list'

import { ListButtonBase } from './list-button-base'

export function ListNumberButton() {
  return <ListButtonBase listStyleType={ListStyleType.Decimal} icon={<OrderedListOutlined />} />
}
