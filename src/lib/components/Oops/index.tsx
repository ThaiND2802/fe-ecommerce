import { Flex, FlexProps, Button } from 'antd'
import cn from 'classnames'

import useLocale from '../../locales/useLocale'

export interface OopsProps extends Omit<FlexProps, 'children'> {
  classNames?: {
    root?: string
    image?: string
    message?: string
    reloadButton?: string
  }
  showMessage?: boolean
  message?: string
  image?: string
  showReloadButton?: boolean
  children?: React.ReactNode
}

const Oops = ({
  className,
  classNames,
  showMessage = true,
  showReloadButton = false,
  message,
  image,
  children,
  style,
  ...props
}: OopsProps) => {
  const [t] = useLocale('Oops')

  return (
    <Flex
      className={cn(className, classNames?.root)}
      align="center"
      justify="center"
      vertical
      style={{ height: '100%', ...style }}
      {...props}>
      <img
        className={classNames?.image}
        src={image}
        alt=""
        style={{ maxWidth: 600, width: '100%' }}
      />
      {showMessage && <span className={classNames?.message}>{message}</span>}
      {showReloadButton && (
        <Button
          className={classNames?.reloadButton}
          type="primary"
          onClick={() => globalThis.location.reload()}
          style={{ marginTop: 16 }}>
          {t.reloadPage}
        </Button>
      )}
      {children}
    </Flex>
  )
}

export default Oops
