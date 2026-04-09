import { useEffect } from 'react'
import { Form } from 'antd'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  createInventoryLog,
  CreateInventoryLogParams,
  inventoryLogQueries,
  UpdateInventoryLogParams,
  updateInventoryLog,
} from 'src/entities/management/inventory-log'
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

  const { data: inventoryLogDetail } = useQuery({
    ...inventoryLogQueries.detail(id ?? ''),
    enabled: !!id && formVisible,
  })

  const { mutate: create } = useMutation({
    mutationFn: createInventoryLog,
    onSuccess: () => {
      createSuccess()
      emitter.emit(EVENTS.REFRESH_TABLE)
      handleClose()
    },
  })

  const { mutate: update } = useMutation({
    mutationFn: updateInventoryLog,
    onSuccess: () => {
      updateSuccess()
      emitter.emit(EVENTS.REFRESH_TABLE)
      handleClose()
    },
  })

  const handleSubmit = (values: IFormValue) => {
    const data: CreateInventoryLogParams = {
      id: values.id,
      inventory_id: values.inventory_id,
      movement_type: values.movement_type,
      quantity: values.quantity,
      balance: values.balance,
      reference_id: values.reference_id,
      reference_type: values.reference_type,
      notes: values.notes,
    }

    if (id) {
      update({ ...data, original_id: id } as UpdateInventoryLogParams)
    } else {
      create(data)
    }
  }

  const onSave = () => {
    form.validateFields().then((values) => handleSubmit(values))
  }

  useEffect(() => {
    if (id && formVisible && inventoryLogDetail?.data) {
      form.setFieldsValue({
        id: inventoryLogDetail.data.id,
        inventory_id: inventoryLogDetail.data.inventory_id,
        movement_type: inventoryLogDetail.data.movement_type,
        quantity: inventoryLogDetail.data.quantity,
        balance: inventoryLogDetail.data.balance,
        reference_id: inventoryLogDetail.data.reference_id,
        reference_type: inventoryLogDetail.data.reference_type,
        notes: inventoryLogDetail.data.notes,
      })
    }
  }, [form, formVisible, id, inventoryLogDetail])

  return {
    id,
    form,
    formVisible,
    onSave,
    handleClose,
  }
}

export default useDrawer
