import ContactPopover from '../ContactPopover'
import UserCard, { UserCardProps } from '../UserCard'

interface IProps extends UserCardProps {}

const Index = ({ ...props }: IProps) => {
  return (
    <ContactPopover userId={props.id} placement="bottom" mouseEnterDelay={1}>
      <UserCard {...props} />
    </ContactPopover>
  )
}

export default Index
