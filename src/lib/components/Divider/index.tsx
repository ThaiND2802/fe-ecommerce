import { Divider, DividerProps } from 'antd'
import classNames from 'classnames'

import styles from './index.module.less'

interface Props extends DividerProps {
  margin?: number | [number, number]
}

const Index = ({ className, margin, style, ...props }: Props) => {
  margin = typeof margin === 'number' ? [margin, margin] : margin || [12, 12]
  return (
    <Divider
      className={classNames(styles.component, className)}
      style={{
        ...style,
        ...(props.type === 'vertical'
          ? { marginLeft: margin[0], marginRight: margin[1] }
          : { marginTop: margin[0], marginBottom: margin[1] }),
      }}
      {...props}
    />
  )
}

export default Index
