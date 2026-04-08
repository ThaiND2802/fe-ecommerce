export interface ConfigRoomItem {
  id?: string
  ext: string
  remind_time: number
  prepare_time: number
  can_delete: boolean
  send_email: boolean
  max_repeat: number
  note: string
}
