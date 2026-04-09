import { Form, FormInstance, Input, InputNumber } from 'antd'
import { useMemo } from 'react'
import BooleanStatusSelector from 'src/components/BooleanStatusSelector'
import CategorySelector from 'src/components/CategorySelector'
import FormItem from 'src/lib/components/FormItem'
import useLocaleGroup from 'src/locales/useLocaleGroup'
import { FormFields } from './type'

interface IProps {
  form: FormInstance
  isEdit?: boolean
}

const Index = ({ form, isEdit }: IProps) => {
  const [t] = useLocaleGroup('product')
  const requiredRule = useMemo(
    () => [{ required: true, message: t.validation.required }],
    [t.validation.required],
  )

  return (
    <Form layout="vertical" form={form}>
      <FormItem label={t.form.id} name={FormFields.Id} rules={requiredRule}>
        <Input disabled={isEdit} placeholder={`${t.text.input} ${t.form.id}`} />
      </FormItem>
      <FormItem label={t.form.code} name={FormFields.Code} rules={requiredRule}>
        <Input placeholder={`${t.text.input} ${t.form.code}`} />
      </FormItem>
      <FormItem label={t.form.name} name={FormFields.Name} rules={requiredRule}>
        <Input placeholder={`${t.text.input} ${t.form.name}`} />
      </FormItem>
      <FormItem label={t.form.description} name={FormFields.Description}>
        <Input.TextArea rows={4} placeholder={`${t.text.input} ${t.form.description}`} />
      </FormItem>
      <FormItem label={t.form.unit} name={FormFields.Unit} rules={requiredRule}>
        <Input placeholder={`${t.text.input} ${t.form.unit}`} />
      </FormItem>
      <FormItem label={t.form.price} name={FormFields.Price} rules={requiredRule}>
        <InputNumber min={0} style={{ width: '100%' }} placeholder={`${t.text.input} ${t.form.price}`} />
      </FormItem>
      <FormItem label={t.form.cost_price} name={FormFields.CostPrice} rules={requiredRule}>
        <InputNumber
          min={0}
          style={{ width: '100%' }}
          placeholder={`${t.text.input} ${t.form.cost_price}`}
        />
      </FormItem>
      <FormItem label={t.form.image_url} name={FormFields.ImageUrl}>
        <Input placeholder={`${t.text.input} ${t.form.image_url}`} />
      </FormItem>
      <FormItem label={t.form.category_id} name={FormFields.CategoryId} rules={requiredRule}>
        <CategorySelector placeholder={`${t.text.input} ${t.form.category_id}`} />
      </FormItem>
      <FormItem label={t.form.is_active} name={FormFields.IsActive} rules={requiredRule}>
        <BooleanStatusSelector placeholder={`${t.text.input} ${t.form.is_active}`} />
      </FormItem>
    </Form>
  )
}

export default Index
