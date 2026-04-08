import RequestFlow, { IProps as IRequestFlowProps } from '../RequestFlow'
import { IProcessStepsResponse } from '../../entities/approval/types'

interface IProps extends IRequestFlowProps {
  title: string
}

const Index = (props: IProps) => {
  const dataParser = (data: IProcessStepsResponse) => {
    if (!data?.process_tenant_steps) {
      return data
    }

    const result: IProcessStepsResponse['process_tenant_steps'] = data.process_tenant_steps
      .map((tenantStep) => {
        if (tenantStep.process_withdraw_steps && tenantStep.process_withdraw_steps.length > 0) {
          return {
            ...tenantStep,
            process_steps: tenantStep.process_withdraw_steps,
            tenant_name: props.title,
            color: 'red',
          }
        }
        return {
          ...tenantStep,
          process_steps: [],
        }
      })
      .filter((tenantStep) => tenantStep.process_steps && tenantStep.process_steps.length > 0)

    return {
      ...data,
      process_tenant_steps: result,
    }
  }

  return (
    <>
      <RequestFlow {...props} />
      <RequestFlow dataParser={dataParser} {...props} />
    </>
  )
}

export default Index
