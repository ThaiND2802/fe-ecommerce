import { Input, InputProps } from 'antd'
import classNames from 'classnames'

import styles from './index.module.less'

interface Props extends InputProps {
  defaultDisabledCursor?: boolean
}

const Index = ({ className, defaultDisabledCursor, ...props }: Props) => {
  return (
    <Input
      className={classNames(
        styles.input,
        { [styles.defaultCursor]: defaultDisabledCursor },
        className,
      )}
      {...props}
    />
  )
}

export default Index
