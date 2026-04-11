import { Form, FormInstance, Input } from 'antd'
import { useMemo } from 'react'
import BooleanStatusSelector from 'src/components/BooleanStatusSelector'
import DatePicker from 'src/lib/components/DatePicker'
import FormItem from 'src/lib/components/FormItem'
import useLocaleGroup from 'src/locales/useLocaleGroup'
import { FormFields } from './type'

interface IProps {
  form: FormInstance
  isEdit?: boolean
}

const Index = ({ form, isEdit }: IProps) => {
  const [t] = useLocaleGroup('user')
  const requiredRule = useMemo(
    () => [{ required: true, message: t.validation.required }],
    [t.validation.required],
  )

  return (
    <Form layout="vertical" form={form}>
      <FormItem label={t.form.id} name={FormFields.Id} rules={requiredRule}>
        <Input disabled={isEdit} placeholder={`${t.text.input} ${t.form.id}`} />
      </FormItem>
      <FormItem label={t.form.full_name} name={FormFields.FullName} rules={requiredRule}>
        <Input placeholder={`${t.text.input} ${t.form.full_name}`} />
      </FormItem>
      <FormItem label={t.form.email} name={FormFields.Email} rules={requiredRule}>
        <Input placeholder={`${t.text.input} ${t.form.email}`} />
      </FormItem>
      <FormItem label={t.form.phone} name={FormFields.Phone} rules={requiredRule}>
        <Input placeholder={`${t.text.input} ${t.form.phone}`} />
      </FormItem>
      <FormItem label={t.form.image} name={FormFields.Image}>
        <Input placeholder={`${t.text.input} ${t.form.image}`} />
      </FormItem>
      <FormItem label={t.form.gender} name={FormFields.Gender} rules={requiredRule}>
        <Input placeholder={`${t.text.input} ${t.form.gender}`} />
      </FormItem>
      <FormItem label={t.form.date_of_birth} name={FormFields.DateOfBirth} rules={requiredRule}>
        <DatePicker stringValue style={{ width: '100%' }} />
      </FormItem>
      <FormItem label={t.form.address} name={FormFields.Address}>
        <Input.TextArea rows={3} placeholder={`${t.text.input} ${t.form.address}`} />
      </FormItem>
      <FormItem label={t.form.department_id} name={FormFields.DepartmentId} rules={requiredRule}>
        <Input placeholder={`${t.text.input} ${t.form.department_id}`} />
      </FormItem>
      <FormItem label={t.form.position_id} name={FormFields.PositionId} rules={requiredRule}>
        <Input placeholder={`${t.text.input} ${t.form.position_id}`} />
      </FormItem>
      <FormItem label={t.form.job_title_id} name={FormFields.JobTitleId} rules={requiredRule}>
        <Input placeholder={`${t.text.input} ${t.form.job_title_id}`} />
      </FormItem>
      <FormItem label={t.form.avatar_url} name={FormFields.AvatarUrl}>
        <Input placeholder={`${t.text.input} ${t.form.avatar_url}`} />
      </FormItem>
      <FormItem label={t.form.hire_date} name={FormFields.HireDate} rules={requiredRule}>
        <DatePicker stringValue style={{ width: '100%' }} />
      </FormItem>
      <FormItem label={t.form.refresh_token} name={FormFields.RefreshToken}>
        <Input.TextArea rows={3} placeholder={`${t.text.input} ${t.form.refresh_token}`} />
      </FormItem>
      <FormItem
        label={t.form.refresh_token_expiry_time}
        name={FormFields.RefreshTokenExpiryTime}
        rules={requiredRule}>
        <DatePicker stringValue style={{ width: '100%' }} />
      </FormItem>
      <FormItem label={t.form.is_active} name={FormFields.IsActive} rules={requiredRule}>
        <BooleanStatusSelector placeholder={`${t.text.input} ${t.form.is_active}`} />
      </FormItem>
    </Form>
  )
}

export default Index
