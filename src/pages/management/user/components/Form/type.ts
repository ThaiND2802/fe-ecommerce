export enum FormFields {
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

export interface IFormValue {
  [FormFields.Id]: string
  [FormFields.FullName]: string
  [FormFields.Email]: string
  [FormFields.Phone]: string
  [FormFields.Image]: string
  [FormFields.Gender]: string
  [FormFields.DateOfBirth]: string
  [FormFields.Address]: string
  [FormFields.DepartmentId]: string
  [FormFields.PositionId]: string
  [FormFields.JobTitleId]: string
  [FormFields.AvatarUrl]: string
  [FormFields.HireDate]: string
  [FormFields.RefreshToken]: string
  [FormFields.RefreshTokenExpiryTime]: string
  [FormFields.IsActive]: string
}
