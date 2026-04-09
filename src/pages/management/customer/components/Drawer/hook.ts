import { Form } from "antd";
import { IFormValue } from "../Form/type";
import { useStore } from "../../store";
import { useMutation, useQuery } from "@tanstack/react-query";
import useMessage from "src/lib/hooks/message";
import { useEffect } from "react";
import emitter, { EVENTS } from "../../action";
import { createCustomer, CreateCustomerParams, customerQueries, updateCustomer } from "src/entities/management/customer";

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

  const { data: customerDetail } = useQuery({
    ...customerQueries.detail(id ?? ''),
  })

  const { mutate: create } = useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      createSuccess()
      emitter.emit(EVENTS.REFRESH_TABLE)
      handleClose()
    }
  })

  const { mutate: update } = useMutation({
    mutationFn: updateCustomer,
    onSuccess: () => {
      updateSuccess()
      emitter.emit(EVENTS.REFRESH_TABLE)
      handleClose()
    }
  })

  const onSave = () => {
    form.validateFields().then((values) => handleSubmit(values))
  }

  const handleSubmit = (values: IFormValue) => {
    const data: CreateCustomerParams = {
      code: values.code,
      name: values.name,
      email: values.email,
      phone: values.phone,
      address: values.address,
      tax_code: values.tax_code,
      contact_person: values.contact_person,
      credit_limit: values.credit_limit,
      current_debt: values.current_debt,
      customer_type: values.customer_type,
    }
    const idValue = values.code
    if (idValue) {
      update({ id: idValue, ...data, })
    } else {
      create(data)
    }
  }

  useEffect(() => {
    if (customerDetail) {
      form.setFieldsValue({
        code: customerDetail.data.code,
        name: customerDetail.data.name,
        email: customerDetail.data.email,
        phone: customerDetail.data.phone,
        address: customerDetail.data.address,
        tax_code: customerDetail.data.tax_code,
        contact_person: customerDetail.data.contact_person,
        credit_limit: customerDetail.data.credit_limit,
        current_debt: customerDetail.data.current_debt,
        customer_type: customerDetail.data.customer_type,
      })
    }
  }, [customerDetail])

  return {
    id,
    form,
    formVisible,
    onSave,
    handleClose,
  }
};

export default useDrawer;