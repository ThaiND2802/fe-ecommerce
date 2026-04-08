import type { TListElement } from 'platejs'
import { isOrderedList } from '@platejs/list'

export const BlockList = (props) => {
  if (!props.element.listStyleType) return

  return (props) => <List {...props} />
}

function List(props: any) {
  const { listStart, listStyleType } = props.element as TListElement
  const ListTag = isOrderedList(props.element) ? 'ol' : 'ul'

  return (
    <ListTag
      {...props.attributes}
      style={{
        listStyleType,
        paddingInlineStart: 0,
      }}
      start={listStart}>
      <li>{props.children}</li>
    </ListTag>
  )
}
