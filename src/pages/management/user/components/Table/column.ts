import useLocaleGroup from 'src/locales/useLocaleGroup'
import { TableColumnType } from 'src/lib/components/TableColumnSelect'
import { UserItem } from 'src/entities/management/user'

type ITableData = UserItem

export enum EColumnKey {
  Id = 'id',
  FullName = 'full_name',
  Email = 'email',
  Phone = 'phone',
  Image = 'image',
  Gender = 'gender',
  DateOfBirth = 'date_of_birth',
  Address = 'address',
  DepartmentId = 'department_id',
  PositionId = 'position_id',
  JobTitleId = 'job_title_id',
  AvatarUrl = 'avatar_url',
  HireDate = 'hire_date',
  RefreshToken = 'refresh_token',
  RefreshTokenExpiryTime = 'refresh_token_expiry_time',
  IsActive = 'is_active',
}

export const useDefaultTableColumns = () => {
  const [t] = useLocaleGroup('user')

  return [
    { key: EColumnKey.Id, label: t.table.columns.id, isMandatory: true, isActive: true },
    { key: EColumnKey.FullName, label: t.table.columns.full_name, isActive: true },
    { key: EColumnKey.Email, label: t.table.columns.email, isActive: true },
    { key: EColumnKey.Phone, label: t.table.columns.phone, isActive: true },
    { key: EColumnKey.Image, label: t.table.columns.image, isActive: true },
    { key: EColumnKey.Gender, label: t.table.columns.gender, isActive: true },
    { key: EColumnKey.DateOfBirth, label: t.table.columns.date_of_birth, isActive: true },
    { key: EColumnKey.Address, label: t.table.columns.address, isActive: true },
    { key: EColumnKey.DepartmentId, label: t.table.columns.department_id, isActive: true },
    { key: EColumnKey.PositionId, label: t.table.columns.position_id, isActive: true },
    { key: EColumnKey.JobTitleId, label: t.table.columns.job_title_id, isActive: true },
    { key: EColumnKey.AvatarUrl, label: t.table.columns.avatar_url, isActive: true },
    { key: EColumnKey.HireDate, label: t.table.columns.hire_date, isActive: true },
    { key: EColumnKey.RefreshToken, label: t.table.columns.refresh_token, isActive: true },
    {
      key: EColumnKey.RefreshTokenExpiryTime,
      label: t.table.columns.refresh_token_expiry_time,
      isActive: true,
    },
    { key: EColumnKey.IsActive, label: t.table.columns.is_active, isActive: true },
  ] as TableColumnType<ITableData>[]
}
