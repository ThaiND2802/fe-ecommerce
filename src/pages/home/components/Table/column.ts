import useLocaleGroup from 'src/locales/useLocaleGroup'
import { TableColumnType } from 'src/lib/components/TableColumnSelect'
import { OrderItem } from 'src/entities/management/order'

type ITableData = OrderItem

export enum EColumnKey {
  OrderCode = 'order_code',
  CustomerId = 'customer_id',
  OrderDate = 'order_date',
  DueDate = 'due_date',
  OrderType = 'order_type',
  DeliveryAddress = 'delivery_address',
  VatRate = 'vat_rate',
  VatAmount = 'vat_amount',
  TotalAmount = 'total_amount',
  TotalAmountWithVat = 'total_amount_with_vat',
  AmountPaid = 'amount_paid',
  DebtAmount = 'debt_amount',
  PaymentMethod = 'payment_method',
  Status = 'status',
  Note = 'note',
}

export const useDefaultTableColumns = () => {
  const [t] = useLocaleGroup('order')

  return [
    {
      key: EColumnKey.OrderCode,
      label: t.table.columns.order_code,
      isMandatory: true,
      isActive: true,
    },
    {
      key: EColumnKey.CustomerId,
      label: t.table.columns.customer_id,
      isActive: true,
    },
    {
      key: EColumnKey.OrderDate,
      label: t.table.columns.order_date,
      isActive: true,
    },
    {
      key: EColumnKey.DueDate,
      label: t.table.columns.due_date,
      isActive: true,
    },
    {
      key: EColumnKey.OrderType,
      label: t.table.columns.order_type,
      isActive: true,
    },
    {
      key: EColumnKey.DeliveryAddress,
      label: t.table.columns.delivery_address,
      isActive: true,
    },
    {
      key: EColumnKey.VatRate,
      label: t.table.columns.vat_rate,
      isActive: true,
    },
    {
      key: EColumnKey.VatAmount,
      label: t.table.columns.vat_amount,
      isActive: true,
    },
    {
      key: EColumnKey.TotalAmount,
      label: t.table.columns.total_amount,
      isActive: true,
    },
    {
      key: EColumnKey.TotalAmountWithVat,
      label: t.table.columns.total_amount_with_vat,
      isActive: true,
    },
    {
      key: EColumnKey.AmountPaid,
      label: t.table.columns.amount_paid,
      isActive: true,
    },
    {
      key: EColumnKey.DebtAmount,
      label: t.table.columns.debt_amount,
      isActive: true,
    },
    {
      key: EColumnKey.PaymentMethod,
      label: t.table.columns.payment_method,
      isActive: true,
    },
    {
      key: EColumnKey.Status,
      label: t.table.columns.status,
      isActive: true,
    },
    {
      key: EColumnKey.Note,
      label: t.table.columns.note,
      isActive: true,
    },
  ] as TableColumnType<ITableData>[]
}
