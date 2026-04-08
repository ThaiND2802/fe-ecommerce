import { InputNumber, InputNumberProps } from 'antd'

const Index = ({ style, ...otherProps }: InputNumberProps) => {
  return <InputNumber style={{ width: '100%', ...style }} precision={0} {...otherProps} />
}

export default Index
