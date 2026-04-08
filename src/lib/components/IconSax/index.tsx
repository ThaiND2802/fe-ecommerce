import React from 'react'
import classNames from 'classnames'

export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  size?: number
  flex?: boolean
  center?: boolean
}

const IconSax = ({ name, size, className, style, flex, center, ...props }: IconProps) => {
  const sizeStyle = size ? { fontSize: size } : {}

  return (
    <i
      className={classNames('iconsax', className)}
      data-icon-name={name}
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

export default IconSax
