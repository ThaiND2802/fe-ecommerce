import React from 'react'
import classNames from 'classnames'

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  size?: number
}

const IconSax = ({ name, size, className, style, ...props }: IconProps) => {
  const sizeStyle = size ? { fontSize: size } : {}

  return (
    <i
      className={classNames('iconsax', className)}
      data-icon-name={name}
      style={{ ...sizeStyle, ...style }}
      {...props}
    />
  )
}

export default IconSax
