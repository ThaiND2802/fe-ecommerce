import { useEffect } from 'react'
import { Form } from 'antd'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  createTenant,
  CreateTenantParams,
  tenantQueries,
  UpdateTenantParams,
  updateTenant,
} from 'src/entities/management/tenant'
import useMessage from 'src/lib/hooks/message'
import emitter, { EVENTS } from '../../action'
import { useStore } from '../../store'
import { IFormValue } from '../Form/type'

const useDrawer = () => {
  const [form] = Form.useForm()
  const { createSuccess, updateSuccess } = useMessage()

  const id = useStore((state) => state.id)
  const setId = useStore((state) => state.setId)
  const formVisible = useStore((state) => state.formVisible)
  const toggleFormVisible = useStore((state) => state.toggleFormVisible)

  const handleClose = () => {
    toggleFormVisible()
    form.resetFields()
    setId(undefined)
  }

  const { data: tenantDetail } = useQuery({
    ...tenantQueries.detail(id ?? ''),
    enabled: !!id && formVisible,
  })

  const { mutate: create } = useMutation({
    mutationFn: createTenant,
    onSuccess: () => {
      createSuccess()
      emitter.emit(EVENTS.REFRESH_TABLE)
      handleClose()
    },
  })

  const { mutate: update } = useMutation({
    mutationFn: updateTenant,
    onSuccess: () => {
      updateSuccess()
      emitter.emit(EVENTS.REFRESH_TABLE)
      handleClose()
    },
  })

  const handleSubmit = (values: IFormValue) => {
    const data: CreateTenantParams = {
      id: values.id,
      name: values.name,
      schema: values.schema,
    }

    if (id) {
      update({ ...data, original_id: id } as UpdateTenantParams)
    } else {
      create(data)
    }
  }

  const onSave = () => {
    form.validateFields().then((values) => handleSubmit(values))
  }

  useEffect(() => {
    if (id && formVisible && tenantDetail?.data) {
      form.setFieldsValue({
        id: tenantDetail.data.id,
        name: tenantDetail.data.name,
        schema: tenantDetail.data.schema,
      })
    }
  }, [form, formVisible, id, tenantDetail])

  return {
    id,
    form,
    formVisible,
    onSave,
    handleClose,
  }
}

export default useDrawer
