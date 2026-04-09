import { Form, FormInstance, Input, InputNumber } from 'antd'
import { useMemo } from 'react'
import DatePicker from 'src/lib/components/DatePicker'
import FormItem from 'src/lib/components/FormItem'
import CustomerSelector from 'src/components/CustomerSelector'
import OrderStatusSelector from 'src/components/OrderStatusSelector'
import OrderTypeSelector from 'src/components/OrderTypeSelector'
import useLocaleGroup from 'src/locales/useLocaleGroup'
import { FormFields } from './type'

interface IProps {
  form: FormInstance
}

const Index = ({ form }: IProps) => {
  const [t] = useLocaleGroup('order')
  const requiredRule = useMemo(
    () => [{ required: true, message: t.validation.required }],
    [t.validation.required],
  )

  const handleValuesChange = (_changedValues: unknown, values: Record<string, number>) => {
    const vatRate = Number(values.vat_rate || 0)
    const totalAmount = Number(values.total_amount || 0)
    const amountPaid = Number(values.amount_paid || 0)
    const vatAmount = (totalAmount * vatRate) / 100
    const totalAmountWithVat = totalAmount + vatAmount
    const debtAmount = Math.max(totalAmountWithVat - amountPaid, 0)

    form.setFieldsValue({
      vat_amount: vatAmount,
      total_amount_with_vat: totalAmountWithVat,
      debt_amount: debtAmount,
    })
  }

  return (
    <Form layout="vertical" form={form} onValuesChange={handleValuesChange}>
      <FormItem label={t.form.order_code} name={FormFields.OrderCode} rules={requiredRule}>
        <Input placeholder={`${t.text.input} ${t.form.order_code}`} />
      </FormItem>
      <FormItem label={t.form.customer_id} name={FormFields.CustomerId} rules={requiredRule}>
        <CustomerSelector placeholder={`${t.text.input} ${t.form.customer_id}`} />
      </FormItem>
      <FormItem label={t.form.order_date} name={FormFields.OrderDate} rules={requiredRule}>
        <DatePicker stringValue style={{ width: '100%' }} />
      </FormItem>
      <FormItem label={t.form.due_date} name={FormFields.DueDate} rules={requiredRule}>
        <DatePicker stringValue style={{ width: '100%' }} />
      </FormItem>
      <FormItem label={t.form.order_type} name={FormFields.OrderType} rules={requiredRule}>
        <OrderTypeSelector placeholder={`${t.text.input} ${t.form.order_type}`} />
      </FormItem>
      <FormItem
        label={t.form.delivery_address}
        name={FormFields.DeliveryAddress}
        rules={requiredRule}>
        <Input.TextArea rows={3} placeholder={`${t.text.input} ${t.form.delivery_address}`} />
      </FormItem>
      <FormItem label={t.form.vat_rate} name={FormFields.VatRate} rules={requiredRule}>
        <InputNumber
          min={0}
          style={{ width: '100%' }}
          placeholder={`${t.text.input} ${t.form.vat_rate}`}
        />
      </FormItem>
      <FormItem label={t.form.vat_amount} name={FormFields.VatAmount}>
        <InputNumber
          disabled
          style={{ width: '100%' }}
          placeholder={`${t.text.input} ${t.form.vat_amount}`}
        />
      </FormItem>
      <FormItem label={t.form.total_amount} name={FormFields.TotalAmount} rules={requiredRule}>
        <InputNumber
          min={0}
          style={{ width: '100%' }}
          placeholder={`${t.text.input} ${t.form.total_amount}`}
        />
      </FormItem>
      <FormItem label={t.form.total_amount_with_vat} name={FormFields.TotalAmountWithVat}>
        <InputNumber
          disabled
          style={{ width: '100%' }}
          placeholder={`${t.text.input} ${t.form.total_amount_with_vat}`}
        />
      </FormItem>
      <FormItem label={t.form.amount_paid} name={FormFields.AmountPaid} rules={requiredRule}>
        <InputNumber
          min={0}
          style={{ width: '100%' }}
          placeholder={`${t.text.input} ${t.form.amount_paid}`}
        />
      </FormItem>
      <FormItem label={t.form.debt_amount} name={FormFields.DebtAmount}>
        <InputNumber
          disabled
          style={{ width: '100%' }}
          placeholder={`${t.text.input} ${t.form.debt_amount}`}
        />
      </FormItem>
      <FormItem label={t.form.payment_method} name={FormFields.PaymentMethod} rules={requiredRule}>
        <Input placeholder={`${t.text.input} ${t.form.payment_method}`} />
      </FormItem>
      <FormItem label={t.form.status} name={FormFields.Status} rules={requiredRule}>
        <OrderStatusSelector placeholder={`${t.text.input} ${t.form.status}`} />
      </FormItem>
      <FormItem label={t.form.note} name={FormFields.Note}>
        <Input.TextArea rows={4} placeholder={`${t.text.input} ${t.form.note}`} />
      </FormItem>
    </Form>
  )
}

export default Index
