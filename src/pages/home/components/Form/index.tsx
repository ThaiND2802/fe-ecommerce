import { Flex, Form, FormInstance, Input } from 'antd'
import ProductSelector from 'src/components/ProductSelector'
import IconSax from 'src/lib/components/IconSax'
import { ActionIcon } from 'src/lib/components/ActionIcon'
import FormItem, { FormItemCustom } from 'src/lib/components/FormItem'
import useForm from './hook'
import { FormFields, ProductFields } from './type'
import styles from './index.module.less'

interface IProps {
  form: FormInstance
}

const Index = ({ form }: IProps) => {
  const { requiredRule, addProduct, updateAmount } = useForm({ form })

  return (
    <Form layout="vertical" form={form}>
      <FormItem label="Order ID" name={FormFields.OrderId} rules={requiredRule}>
        <Input disabled />
      </FormItem>

      <FormItem label="Order Date" name={FormFields.OrderDate} rules={requiredRule}>
        <Input disabled />
      </FormItem>

      <Form.List name={FormFields.Products}>
        {(fields, { remove }) => (
          <FormItemCustom
            customLabel={{
              label: (
                <Flex align="center" justify="space-between" className={styles.labelRow}>
                  <span>Products</span>
                  <ActionIcon className={styles.addAction} onClick={addProduct}>
                    <IconSax name="add" size={18} />
                  </ActionIcon>
                </Flex>
              ),
            }}
            noMargin>
            <Flex vertical gap={12}>
              {fields.map((field) => (
                <Flex key={field.key} align="center">
                  <FormItem
                    noMargin
                    className={styles.productField}
                    name={[field.name, ProductFields.ProductId]}
                    rules={requiredRule}>
                    <ProductSelector placeholder="Select product" />
                  </FormItem>

                  <Flex gap={4} align="center" className={styles.quantityWrapper}>
                    {fields.length > 1 && (
                      <ActionIcon red onClick={() => remove(field.name)}>
                        <IconSax name="trash" size={16} />
                      </ActionIcon>
                    )}

                    <ActionIcon
                      className={styles.quantityButton}
                      onClick={() => updateAmount(field.name, -1)}>
                      <IconSax name="minus" size={14} />
                    </ActionIcon>

                    <FormItem
                      noMargin
                      className={styles.quantityValue}
                      name={[field.name, ProductFields.Amount]}
                      rules={requiredRule}>
                      <Input disabled className={styles.quantityInput} />
                    </FormItem>

                    <ActionIcon
                      className={styles.quantityButton}
                      onClick={() => updateAmount(field.name, 1)}>
                      <IconSax name="add" size={14} />
                    </ActionIcon>
                  </Flex>
                </Flex>
              ))}
            </Flex>
          </FormItemCustom>
        )}
      </Form.List>
    </Form>
  )
}

export default Index
