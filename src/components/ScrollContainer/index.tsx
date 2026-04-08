import SimpleBar, { Props } from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

interface IProps extends Props {
  ref?: React.RefObject<any>
  children: React.ReactNode
  className?: string
}

const Index = ({ ...props }: IProps) => {
  return <SimpleBar style={{ height: '100%' }} {...props} />
}

export default Index
