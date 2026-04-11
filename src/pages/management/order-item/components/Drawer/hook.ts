import { useEffect } from 'react'
import { Form } from 'antd'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  createOrderItem,
  CreateOrderItemParams,
  orderItemQueries,
  UpdateOrderItemParams,
  updateOrderItem,
} from 'src/entities/management/order-item'
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

  const { data: orderItemDetail } = useQuery({
    ...orderItemQueries.detail(id ?? ''),
    enabled: !!id && formVisible,
  })

  const { mutate: create } = useMutation({
    mutationFn: createOrderItem,
    onSuccess: () => {
      createSuccess()
      emitter.emit(EVENTS.REFRESH_TABLE)
      handleClose()
    },
  })

  const { mutate: update } = useMutation({
    mutationFn: updateOrderItem,
    onSuccess: () => {
      updateSuccess()
      emitter.emit(EVENTS.REFRESH_TABLE)
      handleClose()
    },
  })

  const handleSubmit = (values: IFormValue) => {
    const data: CreateOrderItemParams = {
      id: values.id,
      order_id: values.order_id,
      product_id: values.product_id,
      coefficient_0: values.coefficient_0,
      coefficient_1: values.coefficient_1,
      coefficient_2: values.coefficient_2,
      coefficient_3: values.coefficient_3,
      coefficient_4: values.coefficient_4,
      coefficient_5: values.coefficient_5,
      quantity: values.quantity,
      unit_price: values.unit_price,
      total: values.total,
    }

    if (id) {
      update({ ...data, original_id: id } as UpdateOrderItemParams)
    } else {
      create(data)
    }
  }

  const onSave = () => {
    form.validateFields().then((values) => handleSubmit(values))
  }

  useEffect(() => {
    if (id && formVisible && orderItemDetail?.data) {
      form.setFieldsValue({
        id: orderItemDetail.data.id,
        order_id: orderItemDetail.data.order_id,
        product_id: orderItemDetail.data.product_id,
        coefficient_0: orderItemDetail.data.coefficient_0,
        coefficient_1: orderItemDetail.data.coefficient_1,
        coefficient_2: orderItemDetail.data.coefficient_2,
        coefficient_3: orderItemDetail.data.coefficient_3,
        coefficient_4: orderItemDetail.data.coefficient_4,
        coefficient_5: orderItemDetail.data.coefficient_5,
        quantity: orderItemDetail.data.quantity,
        unit_price: orderItemDetail.data.unit_price,
        total: orderItemDetail.data.total,
      })
    }
  }, [form, formVisible, id, orderItemDetail])

  return {
    id,
    form,
    formVisible,
    onSave,
    handleClose,
  }
}

export default useDrawer
