import { Form, FormInstance, Input, InputNumber } from "antd"
import FormItem from "src/lib/components/FormItem"
import { FormFields } from "./type"
import useLocaleGroup from "src/locales/useLocaleGroup"
import CustomerTypeSelector from "src/components/CustomerTypeSelector"


interface Iprops {
  form: FormInstance
}
const Index = ({ form }: Iprops) => {
  const [t] = useLocaleGroup('customer')

  return (
    <Form layout="vertical" form={form}>
      <FormItem label={t.form.code} name={FormFields.Code}>
        <Input placeholder={`${t.text.input} ${t.form.code}`} />
      </FormItem>
      <FormItem label={t.form.name} name={FormFields.Name}>
        <Input placeholder={`${t.text.input} ${t.form.name}`} />
      </FormItem>
      <FormItem label={t.form.email} name={FormFields.Email}>
        <Input placeholder={`${t.text.input} ${t.form.email}`} />
      </FormItem>
      <FormItem label={t.form.phone} name={FormFields.Phone}>
        <Input placeholder={`${t.text.input} ${t.form.phone}`} />
      </FormItem>
      <FormItem label={t.form.address} name={FormFields.Address}>
      </FormItem>
      <FormItem label={t.form.tax_code} name={FormFields.TaxCode}>
        <Input placeholder={`${t.text.input} ${t.form.tax_code}`} />
      </FormItem>
      <FormItem label={t.form.contact_person} name={FormFields.ContactPerson}>
        <Input placeholder={`${t.text.input} ${t.form.contact_person}`} />
      </FormItem>
      <FormItem label={t.form.credit_limit} name={FormFields.CreditLimit}>
        <InputNumber placeholder={`${t.text.input} ${t.form.credit_limit}`} />
      </FormItem>
      <FormItem label={t.form.current_debt} name={FormFields.CurrentDebt}>
        <InputNumber placeholder={`${t.text.input} ${t.form.current_debt}`} />
      </FormItem>
      <FormItem label={t.form.customer_type} name={FormFields.CustomerType}>
        <CustomerTypeSelector placeholder={`${t.text.input} ${t.form.customer_type}`} />
      </FormItem>
    </Form>
  )
}

export default Index