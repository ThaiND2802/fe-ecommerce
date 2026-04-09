import { Form, FormInstance, Input, InputNumber } from 'antd'
import { useMemo } from 'react'
import InventorySelector from 'src/components/InventorySelector'
import FormItem from 'src/lib/components/FormItem'
import useLocaleGroup from 'src/locales/useLocaleGroup'
import { FormFields } from './type'

interface IProps {
  form: FormInstance
  isEdit?: boolean
}

const Index = ({ form, isEdit }: IProps) => {
  const [t] = useLocaleGroup('inventoryLog')
  const requiredRule = useMemo(
    () => [{ required: true, message: t.validation.required }],
    [t.validation.required],
  )

  return (
    <Form layout="vertical" form={form}>
      <FormItem label={t.form.id} name={FormFields.Id} rules={requiredRule}>
        <Input disabled={isEdit} placeholder={`${t.text.input} ${t.form.id}`} />
      </FormItem>
      <FormItem label={t.form.inventory_id} name={FormFields.InventoryId} rules={requiredRule}>
        <InventorySelector placeholder={`${t.text.input} ${t.form.inventory_id}`} />
      </FormItem>
      <FormItem label={t.form.movement_type} name={FormFields.MovementType} rules={requiredRule}>
        <InputNumber
          style={{ width: '100%' }}
          placeholder={`${t.text.input} ${t.form.movement_type}`}
        />
      </FormItem>
      <FormItem label={t.form.quantity} name={FormFields.Quantity} rules={requiredRule}>
        <InputNumber style={{ width: '100%' }} placeholder={`${t.text.input} ${t.form.quantity}`} />
      </FormItem>
      <FormItem label={t.form.balance} name={FormFields.Balance} rules={requiredRule}>
        <InputNumber style={{ width: '100%' }} placeholder={`${t.text.input} ${t.form.balance}`} />
      </FormItem>
      <FormItem label={t.form.reference_id} name={FormFields.ReferenceId}>
        <Input placeholder={`${t.text.input} ${t.form.reference_id}`} />
      </FormItem>
      <FormItem label={t.form.reference_type} name={FormFields.ReferenceType}>
        <Input placeholder={`${t.text.input} ${t.form.reference_type}`} />
      </FormItem>
      <FormItem label={t.form.notes} name={FormFields.Notes}>
        <Input.TextArea rows={4} placeholder={`${t.text.input} ${t.form.notes}`} />
      </FormItem>
    </Form>
  )
}

export default Index
