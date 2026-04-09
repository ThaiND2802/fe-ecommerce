export enum ItemStatus {
  InActive = 0,
  Active = 1,
  Deleted = 2,
}

export interface CategoryItem {
  id: string
  name: string
  description: string
  status: ItemStatus
}
