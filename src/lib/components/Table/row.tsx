import React, { useEffect, useTransition } from 'react'
import type { FormInstance } from 'antd'
import { Form } from 'antd'

import { Store } from 'antd/es/form/interface'

interface EditableRowProps<T> {
  index: number
  record: T
  hiddenFields: string[]
  onRowChange: (
    record: T,
    changedValue: Partial<T>,
    allValues: Partial<T>,
    form: FormInstance<T>,
  ) => void
  onRowFormCreated: (form: FormInstance<T>, record: T) => void
}

export const EditableContext = React.createContext<FormInstance<any> | null>(null)

const EditableRow = <T,>({
  index,
  record,
  hiddenFields,
  onRowChange,
  onRowFormCreated,
  ...props
}: EditableRowProps<T>) => {
  const [form] = Form.useForm<T>()
  const [_isPending, startTransition] = useTransition()

  useEffect(() => {
    if (onRowFormCreated) {
      onRowFormCreated(form, record)
    }
  }, [form])

  return (
    <Form
      form={form}
      component={false}
      initialValues={record as Store}
      onValuesChange={(changed, allValues) => {
        startTransition(() => {
          onRowChange(record, changed, allValues, form)
        })
      }}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
        {!!hiddenFields?.length && (
          <tr style={{ display: 'none' }}>
            <td>
              {hiddenFields.map((fieldName) => (
                <Form.Item name={fieldName} key={fieldName} noStyle hidden />
              ))}
            </td>
          </tr>
        )}
      </EditableContext.Provider>
    </Form>
  )
}

export default EditableRow
