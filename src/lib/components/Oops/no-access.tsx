import useLocale from '../../locales/useLocale'
import NoAccessImage from './no-access.png'
import Oops, { OopsProps } from './index'

interface IProps extends Omit<OopsProps, 'image'> {}

const Index = ({ message, ...props }: IProps) => {
  const [t] = useLocale('Oops')

  return <Oops image={NoAccessImage} message={message || t.noAccess} {...props} />
}

export default Index
