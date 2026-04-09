export interface InventoryItem {
  id: string
  product_id: string
  quantity: number
  reserved_quantity: number
  available_quantity: number
  reorder_level: number
  last_updated: string
}
