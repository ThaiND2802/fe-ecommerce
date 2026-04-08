import { theme } from 'antd'
import type { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/types'
import classNames from 'classnames'

import styles from './index.module.less'

type Orientation = 'horizontal' | 'vertical'

const edgeToOrientationMap: Record<Edge, Orientation> = {
  top: 'horizontal',
  bottom: 'horizontal',
  left: 'vertical',
  right: 'vertical',
}

const DropIndicator = ({
  edge,
  gap,
  className,
}: {
  edge: Edge
  gap: number
  className?: string
}) => {
  const orientation = edgeToOrientationMap[edge]
  const { token } = theme.useToken()

  return (
    <div
      className={classNames(styles.dropIndicator, orientation, edge, className)}
      style={{ background: token.colorPrimary, '--gap': `${gap}px` } as React.CSSProperties}
    />
  )
}

export default DropIndicator
