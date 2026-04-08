import { IMPORT_STEP } from './types'
import { Provider } from './context'

interface IProps {
  children: React.ReactNode
  steps: { key: IMPORT_STEP | string; title?: string }[]
  featureId: string
}

const Index = ({ steps, children, featureId }: IProps) => {
  return <Provider initialState={{ featureId, steps }}>{children}</Provider>
}

export default Index
