import useLocale from '../../locales/useLocale'
import DisconnectedImage from './disconnected.png'
import Oops, { OopsProps } from './index'

interface IProps extends Omit<OopsProps, 'image'> {}

const Index = ({ message, ...props }: IProps) => {
  const [t] = useLocale('Oops')

  return (
    <Oops
      image={DisconnectedImage}
      message={message || t.disconnected}
      showReloadButton={true}
      {...props}
    />
  )
}

export default Index
