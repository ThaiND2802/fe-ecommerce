import useLocale from '../../locales/useLocale'
import ErrorImage from './error.png'
import Oops, { OopsProps } from './index'

interface IProps extends Omit<OopsProps, 'image'> {
  showReloadButton?: boolean
}

const Index = ({ message, ...props }: IProps) => {
  const [t] = useLocale('Oops')

  return <Oops image={ErrorImage} message={message || t.error} showReloadButton={true} {...props} />
}

export default Index
