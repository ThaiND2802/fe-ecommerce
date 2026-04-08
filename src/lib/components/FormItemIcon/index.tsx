import { Flex } from 'antd'
import classNames from 'classnames'

import FormItem, { IProps as FormItemProps } from '../FormItem'

import styles from './index.module.less'

interface IProps extends FormItemProps {
  icon?: React.ReactNode
  formItemClassName?: string
  iconClassName?: string
  inputHeight?: number
}

const IconSize = 22

const FormItemIcon = ({
  className,
  icon,
  formItemClassName,
  iconClassName,
  inputHeight = 32,
  style,
  ...otherProps
}: IProps) => {
  return (
    <Flex className={classNames(styles.container, className)} style={style}>
      <div
        className={classNames(styles.icon, iconClassName, 'form-item-icon')}
        style={
          icon
            ? {
                marginTop: (inputHeight - IconSize) / 2,
              }
            : undefined
        }>
        {icon || <div className={styles.iconPlaceholder} />}
      </div>
      <FormItem className={classNames(styles.formItem, formItemClassName)} {...otherProps} />
    </Flex>
  )
}

export default FormItemIcon
