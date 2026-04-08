import React from 'react'
import classNames from 'classnames'

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  size?: number
}

const Icon = ({ name, size, className, style, ...props }: IconProps) => {
  const sizeStyle = size ? { fontSize: size } : {}

  return (
    <span
      className={classNames(`oicon oic-${name}`, className)}
      style={{ ...sizeStyle, ...style }}
      {...props}
    />
  )
}

export default Icon
