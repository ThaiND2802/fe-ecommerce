import React from 'react'
import classNames from 'classnames'

export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  size?: number
  flex?: boolean
  center?: boolean
}

const Icon = ({ name, size, className, style, flex, center, ...props }: IconProps) => {
  const sizeStyle = size ? { fontSize: size } : {}

  return (
    <span
      className={classNames(`oicon oic-${name}`, className)}
      style={{
        ...sizeStyle,
        ...style,
        ...(flex && { display: 'flex' }),
        ...(center && { alignItems: 'center' }),
      }}
      {...props}
    />
  )
}

export default Icon
