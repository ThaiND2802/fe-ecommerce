import { useEffect } from 'react'
import { Form } from 'antd'
import { useMutation, useQuery } from '@tanstack/react-query'
import { codeGeneratorQueries } from 'src/entities/management/code-generator/queries'
import {
  createCodeGenerator,
  CreateCodeGeneratorParams,
  UpdateCodeGeneratorParams,
  updateCodeGenerator,
} from 'src/entities/management/code-generator/api'
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

  const { data: codeGeneratorDetail } = useQuery({
    ...codeGeneratorQueries.detail(id ?? ''),
    enabled: !!id && formVisible,
  })

  const { mutate: create } = useMutation({
    mutationFn: createCodeGenerator,
    onSuccess: () => {
      createSuccess()
      emitter.emit(EVENTS.REFRESH_TABLE)
      handleClose()
    },
  })

  const { mutate: update } = useMutation({
    mutationFn: updateCodeGenerator,
    onSuccess: () => {
      updateSuccess()
      emitter.emit(EVENTS.REFRESH_TABLE)
      handleClose()
    },
  })

  const handleSubmit = (values: IFormValue) => {
    const data: CreateCodeGeneratorParams = {
      id: values.id,
      prefix: values.prefix,
      last_number: values.last_number,
    }

    if (id) {
      update({ ...data, original_id: id } as UpdateCodeGeneratorParams)
    } else {
      create(data)
    }
  }

  const onSave = () => {
    form.validateFields().then((values) => handleSubmit(values))
  }

  useEffect(() => {
    if (id && formVisible && codeGeneratorDetail?.data) {
      form.setFieldsValue({
        id: codeGeneratorDetail.data.id,
        prefix: codeGeneratorDetail.data.prefix,
        last_number: codeGeneratorDetail.data.last_number,
        created_at: codeGeneratorDetail.data.created_at,
        updated_at: codeGeneratorDetail.data.updated_at,
      })
    }
  }, [codeGeneratorDetail, form, formVisible, id])

  return {
    id,
    form,
    formVisible,
    onSave,
    handleClose,
  }
}

export default useDrawer
