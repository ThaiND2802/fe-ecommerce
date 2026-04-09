import { FormInstance } from 'antd'

interface IProps {
  form: FormInstance
}

const useForm = ({ form }: IProps) => {
  return {
    form,
  }
}

export default useForm
