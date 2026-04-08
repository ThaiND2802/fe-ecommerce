import { Button, ButtonProps } from 'antd'
import classNames from 'classnames'

import styles from './index.module.less'

interface IProps extends ButtonProps {
  ellipsis?: boolean
  line?: number
}

const Index = ({ className, style, ellipsis, line = 1, href, ...props }: IProps) => {
  return (
    <Button
      className={classNames(styles.link, className)}
      color="primary"
      variant="link"
      style={
        ellipsis
          ? {
              lineClamp: line,
              WebkitLineClamp: line,
              overflow: 'hidden',
              ...(line === 1
                ? { whiteSpace: 'nowrap' }
                : { display: '-webkit-box', '-webkit-box-orient': 'vertical' }),
              ...style,
            }
          : style
      }
      onClick={() => {
        if (href) {
          window.open(href, '_blank')
        }
      }}
      {...props}
    />
  )
}

export default Index
