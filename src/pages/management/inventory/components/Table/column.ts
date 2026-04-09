import { InventoryItem } from 'src/entities/management/inventory'
import { TableColumnType } from 'src/lib/components/TableColumnSelect'
import useLocaleGroup from 'src/locales/useLocaleGroup'

type ITableData = InventoryItem

export enum EColumnKey {
  Id = 'id',
  ProductId = 'product_id',
  Quantity = 'quantity',
  ReservedQuantity = 'reserved_quantity',
  AvailableQuantity = 'available_quantity',
  ReorderLevel = 'reorder_level',
  LastUpdated = 'last_updated',
}

export const useDefaultTableColumns = () => {
  const [t] = useLocaleGroup('inventory')

  return [
    {
      key: EColumnKey.Id,
      label: t.table.columns.id,
      isMandatory: true,
      isActive: true,
    },
    {
      key: EColumnKey.ProductId,
      label: t.table.columns.product_id,
      isActive: true,
    },
    {
      key: EColumnKey.Quantity,
      label: t.table.columns.quantity,
      isActive: true,
    },
    {
      key: EColumnKey.ReservedQuantity,
      label: t.table.columns.reserved_quantity,
      isActive: true,
    },
    {
      key: EColumnKey.AvailableQuantity,
      label: t.table.columns.available_quantity,
      isActive: true,
    },
    {
      key: EColumnKey.ReorderLevel,
      label: t.table.columns.reorder_level,
      isActive: true,
    },
    {
      key: EColumnKey.LastUpdated,
      label: t.table.columns.last_updated,
      isActive: true,
    },
  ] as TableColumnType<ITableData>[]
}
