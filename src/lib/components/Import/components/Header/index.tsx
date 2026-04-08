import { useNavigate } from 'react-router-dom'

import Button from '../../../Button'
import PageHeader, { PageHeaderProps } from '../../../PageHeader'
import useLocale from '../../../../locales/useLocale'
import { useContextStore as useStore } from '../../context'

interface HeaderProps extends Omit<PageHeaderProps, 'title'> {
  title?: string
}

const Header = ({ title, ...props }: HeaderProps) => {
  const [t] = useLocale('Import')
  const navigate = useNavigate()

  const stepIndex = useStore((state) => state.stepIndex)
  const steps = useStore((state) => state.steps)
  const isLoading = useStore((state) => state.isLoading)
  const isSubmittingImport = useStore((state) => state.isSubmittingImport)
  const back = useStore((state) => state.back)
  const next = useStore((state) => state.next)

  const handleBack = () => {
    back()
  }

  const handleContinue = () => {
    next()
  }

  const navBack = () => {
    navigate(-1)
  }

  const isLastStep = stepIndex === steps.length - 1

  const actions = () => {
    if (isLoading) {
      return []
    }

    const nextButton = (
      <Button type="primary" key="continue" onClick={handleContinue} loading={isSubmittingImport}>
        {isLastStep ? t.button.import || t.button.continue : t.button.continue}
      </Button>
    )

    if (stepIndex === 0) {
      return [
        <Button key="cancel" onClick={navBack} disabled={isSubmittingImport}>
          {t.button.cancel}
        </Button>,
        nextButton,
      ]
    }

    return [
      <Button key="back" onClick={handleBack} disabled={stepIndex === 0 || isSubmittingImport}>
        {t.button.back}
      </Button>,
      nextButton,
    ]
  }

  return (
    <PageHeader
      title={title || t.title}
      back
      actions={actions()}
      onBack={() => history.back()}
      {...props}
    />
  )
}

export default Header
