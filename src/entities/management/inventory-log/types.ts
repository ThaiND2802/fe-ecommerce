export interface InventoryLogItem {
  id: string
  inventory_id: string
  movement_type: number
  quantity: number
  balance: number
  reference_id: string
  reference_type: string
  notes: string
}
