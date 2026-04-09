import { useEffect } from 'react'
import { Form } from 'antd'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  createOrder,
  CreateOrderParams,
  orderQueries,
  updateOrder,
} from 'src/entities/management/order'
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
    setId(undefined as any)
  }

  const { data: orderDetail } = useQuery({
    ...orderQueries.detail(id ?? ''),
  })

  const { mutate: create } = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      createSuccess()
      emitter.emit(EVENTS.REFRESH_TABLE)
      handleClose()
    },
  })

  const { mutate: update } = useMutation({
    mutationFn: updateOrder,
    onSuccess: () => {
      updateSuccess()
      emitter.emit(EVENTS.REFRESH_TABLE)
      handleClose()
    },
  })

  const handleSubmit = (values: IFormValue) => {
    const data: CreateOrderParams = {
      order_code: values.order_code,
      customer_id: values.customer_id,
      order_date: values.order_date,
      due_date: values.due_date,
      order_type: values.order_type,
      delivery_address: values.delivery_address,
      vat_rate: values.vat_rate,
      vat_amount: values.vat_amount,
      total_amount: values.total_amount,
      total_amount_with_vat: values.total_amount_with_vat,
      amount_paid: values.amount_paid,
      debt_amount: values.debt_amount,
      payment_method: values.payment_method,
      status: values.status,
      note: values.note,
    }

    if (id) {
      update({ id, ...data })
    } else {
      create(data)
    }
  }

  const onSave = () => {
    form.validateFields().then((values) => handleSubmit(values))
  }

  useEffect(() => {
    if (orderDetail?.data) {
      form.setFieldsValue({
        order_code: orderDetail.data.order_code,
        customer_id: orderDetail.data.customer_id,
        order_date: orderDetail.data.order_date,
        due_date: orderDetail.data.due_date,
        order_type: orderDetail.data.order_type,
        delivery_address: orderDetail.data.delivery_address,
        vat_rate: orderDetail.data.vat_rate,
        vat_amount: orderDetail.data.vat_amount,
        total_amount: orderDetail.data.total_amount,
        total_amount_with_vat: orderDetail.data.total_amount_with_vat,
        amount_paid: orderDetail.data.amount_paid,
        debt_amount: orderDetail.data.debt_amount,
        payment_method: orderDetail.data.payment_method,
        status: orderDetail.data.status,
        note: orderDetail.data.note,
      })
    }
  }, [form, orderDetail])

  return {
    id,
    form,
    formVisible,
    onSave,
    handleClose,
  }
}

export default useDrawer
