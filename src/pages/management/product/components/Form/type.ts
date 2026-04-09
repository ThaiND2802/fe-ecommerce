export enum FormFields {
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

export interface IFormValue {
  [FormFields.Id]: string
  [FormFields.Code]: string
  [FormFields.Name]: string
  [FormFields.Description]: string
  [FormFields.Unit]: string
  [FormFields.Price]: number
  [FormFields.CostPrice]: number
  [FormFields.ImageUrl]: string
  [FormFields.CategoryId]: string
  [FormFields.IsActive]: boolean
}
