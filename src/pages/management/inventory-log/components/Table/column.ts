import { InventoryLogItem } from 'src/entities/management/inventory-log'
import { TableColumnType } from 'src/lib/components/TableColumnSelect'
import useLocaleGroup from 'src/locales/useLocaleGroup'

type ITableData = InventoryLogItem

export enum EColumnKey {
  Id = 'id',
  InventoryId = 'inventory_id',
  MovementType = 'movement_type',
  Quantity = 'quantity',
  Balance = 'balance',
  ReferenceId = 'reference_id',
  ReferenceType = 'reference_type',
  Notes = 'notes',
}

export const useDefaultTableColumns = () => {
  const [t] = useLocaleGroup('inventoryLog')

  return [
    {
      key: EColumnKey.Id,
      label: t.table.columns.id,
      isMandatory: true,
      isActive: true,
    },
    {
      key: EColumnKey.InventoryId,
      label: t.table.columns.inventory_id,
      isActive: true,
    },
    {
      key: EColumnKey.MovementType,
      label: t.table.columns.movement_type,
      isActive: true,
    },
    {
      key: EColumnKey.Quantity,
      label: t.table.columns.quantity,
      isActive: true,
    },
    {
      key: EColumnKey.Balance,
      label: t.table.columns.balance,
      isActive: true,
    },
    {
      key: EColumnKey.ReferenceId,
      label: t.table.columns.reference_id,
      isActive: true,
    },
    {
      key: EColumnKey.ReferenceType,
      label: t.table.columns.reference_type,
      isActive: true,
    },
    {
      key: EColumnKey.Notes,
      label: t.table.columns.notes,
      isActive: true,
    },
  ] as TableColumnType<ITableData>[]
}
