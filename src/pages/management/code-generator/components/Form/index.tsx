import { Form, FormInstance, Input, InputNumber } from 'antd'
import { useMemo } from 'react'
import DatePicker from 'src/lib/components/DatePicker'
import FormItem from 'src/lib/components/FormItem'
import useLocaleGroup from 'src/locales/useLocaleGroup'
import { FormFields } from './type'

interface IProps {
  form: FormInstance
  isEdit?: boolean
}

const Index = ({ form, isEdit }: IProps) => {
  const [t] = useLocaleGroup('codeGenerator')
  const requiredRule = useMemo(
    () => [{ required: true, message: t.validation.required }],
    [t.validation.required],
  )

  return (
    <Form layout="vertical" form={form}>
      <FormItem label={t.form.id} name={FormFields.Id} rules={requiredRule}>
        <Input disabled={isEdit} placeholder={`${t.text.input} ${t.form.id}`} />
      </FormItem>
      <FormItem label={t.form.prefix} name={FormFields.Prefix} rules={requiredRule}>
        <Input placeholder={`${t.text.input} ${t.form.prefix}`} />
      </FormItem>
      <FormItem label={t.form.last_number} name={FormFields.LastNumber} rules={requiredRule}>
        <InputNumber
          min={0}
          style={{ width: '100%' }}
          placeholder={`${t.text.input} ${t.form.last_number}`}
        />
      </FormItem>
      {isEdit && (
        <>
          <FormItem label={t.form.created_at} name={FormFields.CreatedAt}>
            <DatePicker disabled stringValue showTime style={{ width: '100%' }} />
          </FormItem>
          <FormItem label={t.form.updated_at} name={FormFields.UpdatedAt}>
            <DatePicker disabled stringValue showTime style={{ width: '100%' }} />
          </FormItem>
        </>
      )}
    </Form>
  )
}

export default Index
