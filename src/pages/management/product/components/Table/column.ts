import useLocaleGroup from 'src/locales/useLocaleGroup'
import { TableColumnType } from 'src/lib/components/TableColumnSelect'
import { ProductItem } from 'src/entities/management/product'

type ITableData = ProductItem

export enum EColumnKey {
  Id = 'id',
  Code = 'code',
  Name = 'name',
  Description = 'description',
  Unit = 'unit',
  Price = 'price',
  CostPrice = 'cost_price',
  ImageUrl = 'image_url',
  CategoryId = 'category_id',
  IsActive = 'is_active',
}

export const useDefaultTableColumns = () => {
  const [t] = useLocaleGroup('product')

  return [
    {
      key: EColumnKey.Id,
      label: t.table.columns.id,
      isMandatory: true,
      isActive: true,
    },
    {
      key: EColumnKey.Code,
      label: t.table.columns.code,
      isActive: true,
    },
    {
      key: EColumnKey.Name,
      label: t.table.columns.name,
      isActive: true,
    },
    {
      key: EColumnKey.Description,
      label: t.table.columns.description,
      isActive: true,
    },
    {
      key: EColumnKey.Unit,
      label: t.table.columns.unit,
      isActive: true,
    },
    {
      key: EColumnKey.Price,
      label: t.table.columns.price,
      isActive: true,
    },
    {
      key: EColumnKey.CostPrice,
      label: t.table.columns.cost_price,
      isActive: true,
    },
    {
      key: EColumnKey.ImageUrl,
      label: t.table.columns.image_url,
      isActive: true,
    },
    {
      key: EColumnKey.CategoryId,
      label: t.table.columns.category_id,
      isActive: true,
    },
    {
      key: EColumnKey.IsActive,
      label: t.table.columns.is_active,
      isActive: true,
    },
  ] as TableColumnType<ITableData>[]
}
