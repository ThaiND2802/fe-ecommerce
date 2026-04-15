import { useMemo } from 'react'
import { FormInstance } from 'antd'
import { FormFields, ProductFields } from './type'

interface IProps {
  form: FormInstance
}

const useForm = ({ form }: IProps) => {
  const requiredRule = useMemo(
    () => [{ required: true, message: 'This field is required' }],
    [],
  )

  const addProduct = () => {
    const products = [...(form.getFieldValue(FormFields.Products) || [])]
    products.push({
      [ProductFields.ProductId]: undefined,
      [ProductFields.Amount]: 1,
    })
    form.setFieldValue(FormFields.Products, products)
  }

  const updateAmount = (index: number, delta: number) => {
    const products = [...(form.getFieldValue(FormFields.Products) || [])]
    const currentAmount = Number(products[index]?.[ProductFields.Amount] || 1)

    products[index] = {
      ...products[index],
      [ProductFields.Amount]: Math.max(1, currentAmount + delta),
    }

    form.setFieldValue(FormFields.Products, products)
  }

  return {
    requiredRule,
    addProduct,
    updateAmount,
  }
}

export default useForm
