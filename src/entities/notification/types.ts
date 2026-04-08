export interface NotificationMessage {
  id: string
  tenant_id: string
  module_id: string
  step_id: string
  action_id: string
  entity_id: string
  title: string
  message: string
  is_read: boolean
  company_name: string
  created_at: string
}

export interface NotificationMessageGroup {
  group_data_id: number
  group_data_name: string
  notifications: NotificationMessage[]
}
