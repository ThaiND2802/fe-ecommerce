import React from 'react'

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const Text = ({ children, ...otherProps }: IProps) => {
  return <div {...otherProps}>{children}</div>
}

export default Text
