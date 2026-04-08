import { useMemo } from 'react'
import { Flex } from 'antd'
import cn from 'classnames'

import useLocale from '../../../../locales/useLocale'
import Icon from '../../../Icon'

import { IMPORT_STEP } from '../../types'
import styles from './index.module.less'

interface IProps {
  steps: { key: IMPORT_STEP | string; title?: string }[]
  activeStep: IMPORT_STEP | string
}

const StepIndicator = ({ steps, activeStep }: IProps) => {
  const [t] = useLocale('Import')

  const titleMap = useMemo(
    () => ({
      [IMPORT_STEP.SELECT_FILE]: t.step.selectFile,
      [IMPORT_STEP.CONFIGURATION]: t.step.configuration,
      [IMPORT_STEP.FIELD_MAPPING]: t.step.fieldMapping,
      [IMPORT_STEP.IMPORT]: t.step.import,
    }),
    [t],
  )

  const activeStepIndex = useMemo(() => {
    return steps.findIndex((step) => step.key === activeStep)
  }, [steps, activeStep])

  return (
    <Flex className={styles.stepIndicator} vertical>
      {steps.map((step, index) => (
        <Flex
          key={step.key}
          className={cn(styles.step, {
            [styles.active]: step.key === activeStep,
            [styles.completed]: index < activeStepIndex,
          })}>
          <Flex className={styles.stepNumber}>
            {index < activeStepIndex ? (
              <Icon className={styles.completedIcon} name="checks" size={12} />
            ) : (
              index + 1
            )}
          </Flex>
          <div>{step.title || titleMap[step.key]}</div>
        </Flex>
      ))}
    </Flex>
  )
}

export default StepIndicator
