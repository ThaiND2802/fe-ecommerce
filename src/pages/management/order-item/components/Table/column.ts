import { OrderItem } from 'src/entities/management/order-item'
import { TableColumnType } from 'src/lib/components/TableColumnSelect'
import useLocaleGroup from 'src/locales/useLocaleGroup'

type ITableData = OrderItem

export enum EColumnKey {
  Id = 'id',
  OrderId = 'order_id',
  ProductId = 'product_id',
  Coefficient0 = 'coefficient_0',
  Coefficient1 = 'coefficient_1',
  Coefficient2 = 'coefficient_2',
  Coefficient3 = 'coefficient_3',
  Coefficient4 = 'coefficient_4',
  Coefficient5 = 'coefficient_5',
  Quantity = 'quantity',
  UnitPrice = 'unit_price',
  Total = 'total',
}

export const useDefaultTableColumns = () => {
  const [t] = useLocaleGroup('orderItem')

  return [
    {
      key: EColumnKey.Id,
      label: t.table.columns.id,
      isMandatory: true,
      isActive: true,
    },
    {
      key: EColumnKey.OrderId,
      label: t.table.columns.order_id,
      isActive: true,
    },
    {
      key: EColumnKey.ProductId,
      label: t.table.columns.product_id,
      isActive: true,
    },
    {
      key: EColumnKey.Coefficient0,
      label: t.table.columns.coefficient_0,
      isActive: true,
    },
    {
      key: EColumnKey.Coefficient1,
      label: t.table.columns.coefficient_1,
      isActive: true,
    },
    {
      key: EColumnKey.Coefficient2,
      label: t.table.columns.coefficient_2,
      isActive: true,
    },
    {
      key: EColumnKey.Coefficient3,
      label: t.table.columns.coefficient_3,
      isActive: true,
    },
    {
      key: EColumnKey.Coefficient4,
      label: t.table.columns.coefficient_4,
      isActive: true,
    },
    {
      key: EColumnKey.Coefficient5,
      label: t.table.columns.coefficient_5,
      isActive: true,
    },
    {
      key: EColumnKey.Quantity,
      label: t.table.columns.quantity,
      isActive: true,
    },
    {
      key: EColumnKey.UnitPrice,
      label: t.table.columns.unit_price,
      isActive: true,
    },
    {
      key: EColumnKey.Total,
      label: t.table.columns.total,
      isActive: true,
    },
  ] as TableColumnType<ITableData>[]
}
