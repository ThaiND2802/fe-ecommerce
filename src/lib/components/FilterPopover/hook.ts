import { Form } from 'antd'

export const useFilterForm = () => {
  const [form] = Form.useForm()

  return { form }
}
