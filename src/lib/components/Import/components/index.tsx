import { Flex } from 'antd'

import ResizableContainer from '../../ResizableContainer'
import ScrollContainer from '../../ScrollContainer'

import StepIndicator from './StepIndicator'
import { useContextStore as useStore } from '../context'

import styles from './index.module.less'

interface IProps {
  children: React.ReactNode
}

const Index = ({ children }: IProps) => {
  const steps = useStore((state) => state.steps)
  const currentStep = useStore((state) => state.currentStep)

  return (
    <Flex className={styles.container}>
      <ResizableContainer className={styles.left} initialWidth={300} disableResize={true}>
        <StepIndicator steps={steps} activeStep={currentStep} />
      </ResizableContainer>
      <div className={styles.right}>
        <ScrollContainer fullHeight scrollPadding={16}>
          {children}
        </ScrollContainer>
      </div>
    </Flex>
  )
}

export default Index
