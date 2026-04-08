import React from 'react'
import { Form, FormItemProps, Popover } from 'antd'
import classNames from 'classnames'

import Icon from '../Icon'
import SkeletonBlock from '../SkeletonBlock'

import styles from './index.module.less'

export interface IProps extends FormItemProps {
  noMargin?: boolean
  noMinHeight?: boolean
  noInputMinHeight?: boolean
  autoMargin?: boolean
  loading?: boolean
  skeleton?: React.ReactNode
  skeletonHeight?: number
  marginBottom?: number
}
export interface IPropsCustom extends IProps {
  customLabel?: {
    label: React.ReactNode
    extra?: React.ReactNode
  }
}

interface IPropsWithTooltip extends IPropsCustom {
  tooltip?: string
}

const FormItem = ({
  className,
  noMargin,
  noMinHeight,
  noInputMinHeight,
  autoMargin,
  loading,
  skeleton,
  skeletonHeight,
  marginBottom = 24,
  ...otherProps
}: IProps) => {
  const myClassName = classNames(styles.formItem, className, {
    [styles.noMargin]: noMargin,
    [styles.noMinHeight]: noMinHeight,
    [styles.autoMargin]: autoMargin,
    [styles.noInputMinHeight]: noInputMinHeight,
  })
  if (loading) {
    return (
      <Form.Item className={myClassName} {...otherProps} name="">
        {skeleton || <SkeletonBlock block active height={skeletonHeight} />}
      </Form.Item>
    )
  }
  return (
    <Form.Item
      className={myClassName}
      {...otherProps}
      style={{ ...otherProps.style, '--margin-bottom': `${marginBottom}px` } as React.CSSProperties}
    />
  )
}

const FormItemCustom = ({ className, noMargin, customLabel, ...otherProps }: IPropsCustom) => {
  const isRequired = otherProps.rules?.some((rule) => 'required' in rule && rule.required)

  return (
    <div className={classNames(className)}>
      <div className={classNames(styles.customLabel, 'field-custom-label')}>
        <label className={classNames(styles.label, 'field-label')} htmlFor={otherProps.name}>
          {customLabel.label}
          {isRequired && <span className={styles.required}>*</span>}
        </label>
        <span className="label-extra">{customLabel.extra}</span>
      </div>
      <FormItem
        className={classNames(styles.formItem, { [styles.noMargin]: noMargin })}
        {...otherProps}
      />
    </div>
  )
}

const FormItemWithTooltip = ({ className, label, tooltip, ...otherProps }: IPropsWithTooltip) => {
  return (
    <FormItemCustom
      className={classNames(className, styles.formItemWithTooltip)}
      customLabel={{
        label,
        extra: tooltip ? (
          <Popover content={tooltip}>
            <Icon name="info" size={16} />
          </Popover>
        ) : null,
      }}
      {...otherProps}
    />
  )
}

export default FormItem
export { FormItemCustom, FormItemWithTooltip }
