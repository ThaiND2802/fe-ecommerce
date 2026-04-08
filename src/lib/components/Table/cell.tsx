import React, { useContext, useEffect } from 'react'
import type { FormInstance } from 'antd'
import { Form, Tooltip, theme } from 'antd'
import type { Rule } from 'antd/es/form'
import classNames from 'classnames'

import styles from './index.module.less'
import { EditableContext } from './row'

interface IEditingCell<T> {
  Component: React.ReactNode | ((formValues: T, record: T) => React.ReactElement)
  rules?: Rule[]
  validateTrigger?: string
  dependencies?: any[]
  valuePropName?: string
  onValueChange?: (value: any, form: FormInstance<T>) => void
}

interface EditableCellProps<T> extends IEditingCell<T> {
  editingCells: {
    [rowId: string]: {
      [field: string]: boolean
    }
  }
  editing?: boolean
  title: React.ReactNode
  editable: boolean
  isNewRow?: boolean
  dataIndex: keyof T
  record: T
  rowId: string
  editingRows?: {
    [key: string]: boolean
  }
  tooltipError?: boolean
  toggleEditCell: (rowId: string, field: keyof T, record: T) => void
  rowEditable: (record: T) => boolean
}

const EditableCell = <T,>({
  editingCells,
  editing,
  title,
  editable,
  isNewRow,
  children,
  dataIndex,
  record,
  rowId,
  Component,
  rules,
  editingRows,
  dependencies,
  valuePropName,
  tooltipError,
  validateTrigger,
  rowEditable,
  toggleEditCell,
  onValueChange = () => undefined,
  ...restProps
}: React.PropsWithChildren<EditableCellProps<T>>) => {
  const form = useContext(EditableContext)
  const { token } = theme.useToken()

  const editCell = () => {
    if (rowEditable && !rowEditable(record)) return
    toggleEditCell(rowId, dataIndex, record)
    form.setFieldsValue(record) // can handle refresh (form not re-created)
  }

  const value = Form.useWatch(dataIndex, form)
  const isEditing = isNewRow || editingRows?.[rowId] || editingCells?.[rowId]?.[dataIndex as string]

  useEffect(() => {
    if (isEditing) {
      onValueChange(value, form)
    }
  }, [value])

  let childNode = children
  const fieldError = form.getFieldError(dataIndex)
  const FormItem =
    typeof Component === 'function' ? (
      <Form.Item
        style={{ margin: 0 }}
        dependencies={dependencies || []}
        className={tooltipError ? 'tooltip-error' : ''}>
        {({ getFieldsValue }) => (
          <Form.Item
            name={dataIndex as string}
            rules={rules || []}
            validateTrigger={validateTrigger}>
            {Component(getFieldsValue(), record)}
          </Form.Item>
        )}
      </Form.Item>
    ) : (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex as string}
        rules={rules || []}
        validateTrigger={validateTrigger}
        valuePropName={valuePropName}
        className={tooltipError ? 'tooltip-error' : ''}>
        {Component}
      </Form.Item>
    )

  if (editable) {
    const fieldWithError = tooltipError ? (
      <Tooltip
        title={fieldError.length ? fieldError.map((error) => <div key={error}>{error}</div>) : ''}
        placement="topRight"
        color={token.colorError}>
        <>{FormItem}</>
      </Tooltip>
    ) : (
      FormItem
    )

    childNode = isEditing ? (
      fieldWithError
    ) : (
      <div
        className={classNames(styles.editableCellValueWrap, 'editable-cell')}
        onClick={editCell}
        role="none">
        {children}
        <Form.Item name={dataIndex as string} noStyle hidden />
        <div className={styles.fieldOverlay} />
      </div>
    )
  }

  return <td {...restProps}>{childNode}</td>
}

export default EditableCell
