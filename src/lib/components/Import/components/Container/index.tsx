import React from 'react'

interface IProps extends React.HTMLAttributes<HTMLDivElement> {}

const Index = ({ style, ...props }: IProps) => {
  return <div style={{ width: '100%', maxWidth: 830, margin: 'auto', ...style }} {...props}></div>
}

export default Index
