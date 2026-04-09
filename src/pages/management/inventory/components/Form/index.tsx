import { DatePicker, Form, FormInstance, Input, InputNumber } from 'antd'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import ProductSelector from 'src/components/ProductSelector'
import FormItem from 'src/lib/components/FormItem'
import useLocaleGroup from 'src/locales/useLocaleGroup'
import { FormFields } from './type'

interface IProps {
  form: FormInstance
  isEdit?: boolean
}

const Index = ({ form, isEdit }: IProps) => {
  const [t] = useLocaleGroup('inventory')
  const requiredRule = useMemo(
    () => [{ required: true, message: t.validation.required }],
    [t.validation.required],
  )

  return (
    <Form layout="vertical" form={form}>
      <FormItem label={t.form.id} name={FormFields.Id} rules={requiredRule}>
        <Input disabled={isEdit} placeholder={`${t.text.input} ${t.form.id}`} />
      </FormItem>
      <FormItem label={t.form.product_id} name={FormFields.ProductId} rules={requiredRule}>
        <ProductSelector placeholder={`${t.text.input} ${t.form.product_id}`} />
      </FormItem>
      <FormItem label={t.form.quantity} name={FormFields.Quantity} rules={requiredRule}>
        <InputNumber min={0} style={{ width: '100%' }} placeholder={`${t.text.input} ${t.form.quantity}`} />
      </FormItem>
      <FormItem
        label={t.form.reserved_quantity}
        name={FormFields.ReservedQuantity}
        rules={requiredRule}>
        <InputNumber
          min={0}
          style={{ width: '100%' }}
          placeholder={`${t.text.input} ${t.form.reserved_quantity}`}
        />
      </FormItem>
      <FormItem
        label={t.form.available_quantity}
        name={FormFields.AvailableQuantity}
        rules={requiredRule}>
        <InputNumber
          min={0}
          style={{ width: '100%' }}
          placeholder={`${t.text.input} ${t.form.available_quantity}`}
        />
      </FormItem>
      <FormItem label={t.form.reorder_level} name={FormFields.ReorderLevel} rules={requiredRule}>
        <InputNumber
          min={0}
          style={{ width: '100%' }}
          placeholder={`${t.text.input} ${t.form.reorder_level}`}
        />
      </FormItem>
      <FormItem label={t.form.last_updated} name={FormFields.LastUpdated} rules={requiredRule}>
        <DatePicker
          showTime
          style={{ width: '100%' }}
          format="YYYY-MM-DD HH:mm:ss"
          placeholder={`${t.text.input} ${t.form.last_updated}`}
          getPopupContainer={(triggerNode) => triggerNode.parentElement as HTMLElement}
        />
      </FormItem>
    </Form>
  )
}

export const mapLastUpdatedToForm = (value?: string) => {
  return value ? dayjs(value) : undefined
}

export default Index
