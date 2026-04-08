export interface IProcessItem {
  id?: string
  name: string
}

export interface IProcessListResponse {
  header: { [key: string]: string }[]
  items: IProcessItem[]
  limit: number
  page: number
  total: number
  version: string
}

export enum EProcessStepStatus {
  Inactive = 0,
  Active = 1,
  Completed = 2,
  OutDated = 3,
  Decline = 4,
}

export interface IProcessStep {
  step_id: string
  step_name: string
  due_time: string
  due_date: string
  assignees: {
    id: string
    avatar: string
    name: string
    email: string
    title: string
    delegation: string
    received_date: string
    action_date: string
    delay_time: string
    is_delay: boolean
    due_date: string
    by_pass?: string
  }[]
  step_type: number
  step_order: number
  step_status: EProcessStepStatus
}
export interface IProcessStepsResponse {
  id: string
  name: string
  process_tenant_steps: {
    tenant: string
    tenant_name: string
    process_steps: IProcessStep[]
    process_withdraw_steps?: IProcessStep[]
    color?: string // ui
    hideHandler?: boolean // ui
  }[]
}

export interface IApprovedRequestItem {
  key: string
  value: string
  description: string
}
