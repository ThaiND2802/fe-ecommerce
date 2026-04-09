import { useEffect } from 'react'
import { Form } from 'antd'
import { useMutation, useQuery } from '@tanstack/react-query'
import { productQueries } from 'src/entities/management/product/queries'
import {
  createProduct,
  CreateProductParams,
  UpdateProductParams,
  updateProduct,
} from 'src/entities/management/product/api'
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

  const { data: productDetail } = useQuery({
    ...productQueries.detail(id ?? ''),
    enabled: !!id && formVisible,
  })

  const { mutate: create } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      createSuccess()
      emitter.emit(EVENTS.REFRESH_TABLE)
      handleClose()
    },
  })

  const { mutate: update } = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      updateSuccess()
      emitter.emit(EVENTS.REFRESH_TABLE)
      handleClose()
    },
  })

  const handleSubmit = (values: IFormValue) => {
    const data: CreateProductParams = {
      id: values.id,
      code: values.code,
      name: values.name,
      description: values.description,
      unit: values.unit,
      price: values.price,
      cost_price: values.cost_price,
      image_url: values.image_url,
      category_id: values.category_id,
      is_active: values.is_active,
    }

    if (id) {
      update({ ...data, original_id: id } as UpdateProductParams)
    } else {
      create(data)
    }
  }

  const onSave = () => {
    form.validateFields().then((values) => handleSubmit(values))
  }

  useEffect(() => {
    if (id && formVisible && productDetail?.data) {
      form.setFieldsValue({
        id: productDetail.data.id,
        code: productDetail.data.code,
        name: productDetail.data.name,
        description: productDetail.data.description,
        unit: productDetail.data.unit,
        price: productDetail.data.price,
        cost_price: productDetail.data.cost_price,
        image_url: productDetail.data.image_url,
        category_id: productDetail.data.category_id,
        is_active: productDetail.data.is_active,
      })
    }
  }, [form, formVisible, id, productDetail])

  return {
    id,
    form,
    formVisible,
    onSave,
    handleClose,
  }
}

export default useDrawer
