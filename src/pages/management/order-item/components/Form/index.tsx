import { Form, FormInstance, Input, InputNumber } from 'antd'
import { useMemo } from 'react'
import OrderSelector from 'src/components/OrderSelector'
import ProductSelector from 'src/components/ProductSelector'
import FormItem from 'src/lib/components/FormItem'
import useLocaleGroup from 'src/locales/useLocaleGroup'
import { FormFields } from './type'

interface IProps {
  form: FormInstance
  isEdit?: boolean
}

const Index = ({ form, isEdit }: IProps) => {
  const [t] = useLocaleGroup('orderItem')
  const requiredRule = useMemo(
    () => [{ required: true, message: t.validation.required }],
    [t.validation.required],
  )

  const handleValuesChange = (_changedValues: unknown, values: Record<string, number>) => {
    const quantity = Number(values.quantity || 0)
    const unitPrice = Number(values.unit_price || 0)

    form.setFieldsValue({
      total: quantity * unitPrice,
    })
  }

  return (
    <Form layout="vertical" form={form} onValuesChange={handleValuesChange}>
      <FormItem label={t.form.id} name={FormFields.Id} rules={requiredRule}>
        <Input disabled={isEdit} placeholder={`${t.text.input} ${t.form.id}`} />
      </FormItem>
      <FormItem label={t.form.order_id} name={FormFields.OrderId} rules={requiredRule}>
        <OrderSelector placeholder={`${t.text.input} ${t.form.order_id}`} />
      </FormItem>
      <FormItem label={t.form.product_id} name={FormFields.ProductId} rules={requiredRule}>
        <ProductSelector placeholder={`${t.text.input} ${t.form.product_id}`} />
      </FormItem>
      <FormItem label={t.form.coefficient_0} name={FormFields.Coefficient0} rules={requiredRule}>
        <InputNumber min={0} style={{ width: '100%' }} placeholder={`${t.text.input} ${t.form.coefficient_0}`} />
      </FormItem>
      <FormItem label={t.form.coefficient_1} name={FormFields.Coefficient1} rules={requiredRule}>
        <InputNumber min={0} style={{ width: '100%' }} placeholder={`${t.text.input} ${t.form.coefficient_1}`} />
      </FormItem>
      <FormItem label={t.form.coefficient_2} name={FormFields.Coefficient2} rules={requiredRule}>
        <InputNumber min={0} style={{ width: '100%' }} placeholder={`${t.text.input} ${t.form.coefficient_2}`} />
      </FormItem>
      <FormItem label={t.form.coefficient_3} name={FormFields.Coefficient3} rules={requiredRule}>
        <InputNumber min={0} style={{ width: '100%' }} placeholder={`${t.text.input} ${t.form.coefficient_3}`} />
      </FormItem>
      <FormItem label={t.form.coefficient_4} name={FormFields.Coefficient4} rules={requiredRule}>
        <InputNumber min={0} style={{ width: '100%' }} placeholder={`${t.text.input} ${t.form.coefficient_4}`} />
      </FormItem>
      <FormItem label={t.form.coefficient_5} name={FormFields.Coefficient5} rules={requiredRule}>
        <InputNumber min={0} style={{ width: '100%' }} placeholder={`${t.text.input} ${t.form.coefficient_5}`} />
      </FormItem>
      <FormItem label={t.form.quantity} name={FormFields.Quantity} rules={requiredRule}>
        <InputNumber min={0} style={{ width: '100%' }} placeholder={`${t.text.input} ${t.form.quantity}`} />
      </FormItem>
      <FormItem label={t.form.unit_price} name={FormFields.UnitPrice} rules={requiredRule}>
        <InputNumber min={0} style={{ width: '100%' }} placeholder={`${t.text.input} ${t.form.unit_price}`} />
      </FormItem>
      <FormItem label={t.form.total} name={FormFields.Total} rules={requiredRule}>
        <InputNumber min={0} style={{ width: '100%' }} placeholder={`${t.text.input} ${t.form.total}`} />
      </FormItem>
    </Form>
  )
}

export default Index
