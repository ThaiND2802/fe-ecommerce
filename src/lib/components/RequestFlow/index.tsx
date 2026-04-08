import { useMemo } from 'react'
import { Collapse, Skeleton, Flex } from 'antd'
import { useQuery } from '@tanstack/react-query'
import cn from 'classnames'

import { approvalQueries, IProcessStepsResponse } from '../../entities/approval'
import ApprovalSteps from './approval-steps'
import Icon from '../Icon'

import styles from './index.module.less'

export interface IProps {
  processId?: string
  departmentId?: string
  requestId?: string
  type?: 'new' | 'request' | 'process' | 'data'
  data?: IProcessStepsResponse
  dataParser?: (data: IProcessStepsResponse) => IProcessStepsResponse
}

const Index = ({
  processId,
  departmentId,
  requestId,
  data,
  type = 'new',
  dataParser = (data) => data,
}: IProps) => {
  const enableNewRequestData = type === 'new' && !!processId
  const enableRuntimeData =
    (type === 'request' && !!requestId) || (type === 'process' && !!processId)

  const { data: processData, isLoading } = useQuery({
    ...approvalQueries.processSteps(processId),
    enabled: enableNewRequestData,
  })

  const { data: runtimeData, isLoading: runtimeLoading } = useQuery({
    ...approvalQueries.processRuntimeSteps({
      department_id: departmentId || undefined,
      process_id: processId,
      request_id: requestId,
    }),
    enabled: enableRuntimeData,
  })

  const flowData = (() => {
    switch (true) {
      case enableNewRequestData:
        return dataParser(processData)
      case enableRuntimeData:
        return dataParser(runtimeData)
      case type === 'data':
        return dataParser(data)
      default:
        return null
    }
  })()

  const items = useMemo(() => {
    return (
      flowData?.process_tenant_steps?.map((tenant, index) => ({
        className: cn(styles.collapseItem, tenant.color, { 'no-handler': tenant.hideHandler }),
        key: tenant.tenant,
        label: tenant.tenant_name,
        children: (
          <ApprovalSteps
            items={tenant.process_steps?.map((step) => ({
              id: step.step_id,
              stepName: step.step_name,
              assignees: step.assignees,
              duration: step.due_time,
              dueDate: step.due_date,
              status: step.step_status,
            }))}
            isEnd={index === flowData?.process_tenant_steps?.length - 1}
            start={flowData?.process_tenant_steps?.[index - 1]?.process_steps?.length || 0}
          />
        ),
      })) || []
    )
  }, [flowData])

  const renderExpandIcon = (isActive: boolean) => {
    return (
      <Icon
        name="arrow-down"
        size={18}
        style={{ transform: isActive ? 'rotate(0deg)' : 'rotate(-90deg)' }}
      />
    )
  }

  if (isLoading || runtimeLoading) {
    return (
      <Flex vertical gap={16}>
        <Skeleton />
        <Skeleton />
      </Flex>
    )
  }

  return (
    <Collapse
      className={styles.collapse}
      items={items}
      ghost
      expandIconPosition="end"
      expandIcon={({ isActive }) => renderExpandIcon(isActive)}
      defaultActiveKey={items.map((item) => item.key)}
    />
  )
}

export default Index
