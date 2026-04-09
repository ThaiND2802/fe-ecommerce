import { Form, FormInstance, Input } from 'antd'
import { useMemo } from 'react'
import CategoryStatusSelector from 'src/components/CategoryStatusSelector'
import FormItem from 'src/lib/components/FormItem'
import useLocaleGroup from 'src/locales/useLocaleGroup'
import { FormFields } from './type'

interface IProps {
  form: FormInstance
  isEdit?: boolean
}

const Index = ({ form, isEdit }: IProps) => {
  const [t] = useLocaleGroup('category')
  const requiredRule = useMemo(
    () => [{ required: true, message: t.validation.required }],
    [t.validation.required],
  )

  return (
    <Form layout="vertical" form={form}>
      <FormItem label={t.form.id} name={FormFields.Id} rules={requiredRule}>
        <Input disabled={isEdit} placeholder={`${t.text.input} ${t.form.id}`} />
      </FormItem>
      <FormItem label={t.form.name} name={FormFields.Name} rules={requiredRule}>
        <Input placeholder={`${t.text.input} ${t.form.name}`} />
      </FormItem>
      <FormItem label={t.form.description} name={FormFields.Description}>
        <Input.TextArea rows={4} placeholder={`${t.text.input} ${t.form.description}`} />
      </FormItem>
      <FormItem label={t.form.status} name={FormFields.Status} rules={requiredRule}>
        <CategoryStatusSelector placeholder={`${t.text.input} ${t.form.status}`} />
      </FormItem>
    </Form>
  )
}

export default Index
