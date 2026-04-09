import dayjs from 'dayjs'
import { useEffect } from 'react'
import { Form } from 'antd'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  createInventory,
  CreateInventoryParams,
  inventoryQueries,
  UpdateInventoryParams,
  updateInventory,
} from 'src/entities/management/inventory'
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

  const { data: inventoryDetail } = useQuery({
    ...inventoryQueries.detail(id ?? ''),
    enabled: !!id && formVisible,
  })

  const { mutate: create } = useMutation({
    mutationFn: createInventory,
    onSuccess: () => {
      createSuccess()
      emitter.emit(EVENTS.REFRESH_TABLE)
      handleClose()
    },
  })

  const { mutate: update } = useMutation({
    mutationFn: updateInventory,
    onSuccess: () => {
      updateSuccess()
      emitter.emit(EVENTS.REFRESH_TABLE)
      handleClose()
    },
  })

  const handleSubmit = (values: IFormValue) => {
    const data: CreateInventoryParams = {
      id: values.id,
      product_id: values.product_id,
      quantity: values.quantity,
      reserved_quantity: values.reserved_quantity,
      available_quantity: values.available_quantity,
      reorder_level: values.reorder_level,
      last_updated: dayjs(values.last_updated).format('YYYY-MM-DD HH:mm:ss'),
    }

    if (id) {
      update({ ...data, original_id: id } as UpdateInventoryParams)
    } else {
      create(data)
    }
  }

  const onSave = () => {
    form.validateFields().then((values) => handleSubmit(values))
  }

  useEffect(() => {
    if (id && formVisible && inventoryDetail?.data) {
      form.setFieldsValue({
        id: inventoryDetail.data.id,
        product_id: inventoryDetail.data.product_id,
        quantity: inventoryDetail.data.quantity,
        reserved_quantity: inventoryDetail.data.reserved_quantity,
        available_quantity: inventoryDetail.data.available_quantity,
        reorder_level: inventoryDetail.data.reorder_level,
        last_updated: inventoryDetail.data.last_updated
          ? dayjs(inventoryDetail.data.last_updated)
          : undefined,
      })
    }
  }, [form, formVisible, id, inventoryDetail])

  return {
    id,
    form,
    formVisible,
    onSave,
    handleClose,
  }
}

export default useDrawer
