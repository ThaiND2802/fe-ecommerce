import { useEffect } from 'react'
import { Form } from 'antd'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  createUser,
  CreateUserParams,
  userQueries,
  UpdateUserParams,
  updateUser,
} from 'src/entities/management/user'
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

  const { data: userDetail } = useQuery({
    ...userQueries.detail(id ?? ''),
    enabled: !!id && formVisible,
  })

  const { mutate: create } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      createSuccess()
      emitter.emit(EVENTS.REFRESH_TABLE)
      handleClose()
    },
  })

  const { mutate: update } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      updateSuccess()
      emitter.emit(EVENTS.REFRESH_TABLE)
      handleClose()
    },
  })

  const handleSubmit = (values: IFormValue) => {
    const data: CreateUserParams = {
      id: values.id,
      full_name: values.full_name,
      email: values.email,
      phone: values.phone,
      image: values.image,
      gender: values.gender,
      date_of_birth: values.date_of_birth,
      address: values.address,
      department_id: values.department_id,
      position_id: values.position_id,
      job_title_id: values.job_title_id,
      avatar_url: values.avatar_url,
      hire_date: values.hire_date,
      refresh_token: values.refresh_token,
      refresh_token_expiry_time: values.refresh_token_expiry_time,
      is_active: values.is_active,
    }

    if (id) {
      update({ ...data, original_id: id } as UpdateUserParams)
    } else {
      create(data)
    }
  }

  const onSave = () => {
    form.validateFields().then((values) => handleSubmit(values))
  }

  useEffect(() => {
    if (id && formVisible && userDetail?.data) {
      form.setFieldsValue({
        id: userDetail.data.id,
        full_name: userDetail.data.full_name,
        email: userDetail.data.email,
        phone: userDetail.data.phone,
        image: userDetail.data.image,
        gender: userDetail.data.gender,
        date_of_birth: userDetail.data.date_of_birth,
        address: userDetail.data.address,
        department_id: userDetail.data.department_id,
        position_id: userDetail.data.position_id,
        job_title_id: userDetail.data.job_title_id,
        avatar_url: userDetail.data.avatar_url,
        hire_date: userDetail.data.hire_date,
        refresh_token: userDetail.data.refresh_token,
        refresh_token_expiry_time: userDetail.data.refresh_token_expiry_time,
        is_active: userDetail.data.is_active,
      })
    }
  }, [form, formVisible, id, userDetail])

  return {
    id,
    form,
    formVisible,
    onSave,
    handleClose,
  }
}

export default useDrawer
