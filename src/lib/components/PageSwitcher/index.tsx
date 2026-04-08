import React, { isValidElement, useRef } from 'react'

const Index = ({ children }: { children: React.ReactNode }) => {
  const childrenArray = React.Children.toArray(children)
  const renderedRef = useRef<Record<string, boolean>>({})

  return childrenArray.map((child) => {
    if (isValidElement<PageProps>(child)) {
      const { visible, unmount = true, ...rest } = child.props

      if (visible) {
        renderedRef.current[child.key] = true
        return (
          <div key={child.key} {...rest}>
            {child.props.children}
          </div>
        )
      }

      if (!unmount && renderedRef.current[child.key]) {
        return (
          <div key={child.key} style={{ display: 'none' }}>
            {React.cloneElement(child.props.children as React.ReactElement<PageProps>, {
              invisible: true,
            })}
          </div>
        )
      }
      return null
    }
    return null
  })
}

interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  key: string
  visible: boolean
  unmount?: boolean
  children: React.ReactNode
  invisible?: boolean
}

Index.Page = (_props: PageProps) => null

export default Index
