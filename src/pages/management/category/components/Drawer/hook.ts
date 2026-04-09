import { useEffect } from 'react'
import { Form } from 'antd'
import { useMutation, useQuery } from '@tanstack/react-query'
import { categoryQueries } from 'src/entities/management/category/queries'
import {
  createCategory,
  CreateCategoryParams,
  UpdateCategoryParams,
  updateCategory,
} from 'src/entities/management/category/api'
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

  const { data: categoryDetail } = useQuery({
    ...categoryQueries.detail(id ?? ''),
  })

  const { mutate: create } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      createSuccess()
      emitter.emit(EVENTS.REFRESH_TABLE)
      handleClose()
    },
  })

  const { mutate: update } = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      updateSuccess()
      emitter.emit(EVENTS.REFRESH_TABLE)
      handleClose()
    },
  })

  const handleSubmit = (values: IFormValue) => {
    const data: CreateCategoryParams = {
      id: values.id,
      name: values.name,
      description: values.description,
      status: values.status,
    }

    if (id) {
      update({ ...data, original_id: id } as UpdateCategoryParams)
    } else {
      create(data)
    }
  }

  const onSave = () => {
    form.validateFields().then((values) => handleSubmit(values))
  }

  useEffect(() => {
    if (categoryDetail?.data) {
      form.setFieldsValue({
        id: categoryDetail.data.id,
        name: categoryDetail.data.name,
        description: categoryDetail.data.description,
        status: categoryDetail.data.status,
      })
    }
  }, [form, categoryDetail])

  return {
    id,
    form,
    formVisible,
    onSave,
    handleClose,
  }
}

export default useDrawer
