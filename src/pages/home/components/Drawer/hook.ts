import dayjs from 'dayjs'
import { useEffect } from 'react'
import { Form } from 'antd'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  createOrder,
  CreateOrderParams,
  orderQueries,
  OrderStatus,
  OrderType,
  updateOrder,
} from 'src/entities/management/order'
import { customerQueries } from 'src/entities/management/customer'
import { ProductItem } from 'src/entities/management/product/types'
import { productQueries } from 'src/entities/management/product/queries'
import useMessage from 'src/lib/hooks/message'
import emitter, { EVENTS } from '../../action'
import { useStore } from '../../store'
import { FormFields, IFormValue, IProductFormValue, ProductFields } from '../Form/type'

const createOrderId = () => `ORD-${Math.random().toString(36).slice(2, 10).toUpperCase()}`

const createInitialValues = () => ({
  [FormFields.OrderId]: createOrderId(),
  [FormFields.OrderDate]: dayjs().format('DD/MM/YYYY HH:mm'),
  [FormFields.Products]: [
    {
      [ProductFields.ProductId]: undefined,
      [ProductFields.Amount]: 1,
    },
  ],
})

const parseOrderProducts = (value: string | undefined, fallback: IProductFormValue[]) => {
  try {
    const parsed = JSON.parse(value || '[]')
    if (!Array.isArray(parsed)) {
      return fallback
    }

    const normalized = parsed
      .filter(
        (item): item is IProductFormValue =>
          typeof item === 'object' &&
          item !== null &&
          typeof item.product_id === 'string' &&
          item.product_id.length > 0,
      )
      .map((item) => ({
        [ProductFields.ProductId]: item.product_id,
        [ProductFields.Amount]: Math.max(1, Number(item.amount || 1)),
        unit_price: Number(item.unit_price || 0),
      }))

    return normalized.length ? normalized : fallback
  } catch {
    return fallback
  }
}

const useDrawer = () => {
  const [form] = Form.useForm()
  const { createSuccess, updateSuccess } = useMessage()

  const id = useStore((state) => state.id)
  const setId = useStore((state) => state.setId)
  const formVisible = useStore((state) => state.formVisible)
  const setFormVisible = useStore((state) => state.setFormVisible)

  const handleClose = () => {
    setFormVisible(false)
    form.resetFields()
    setId(undefined)
  }

  const { data: orderDetail } = useQuery({
    ...orderQueries.detail(id ?? ''),
    enabled: !!id && formVisible,
  })

  const { data: productList } = useQuery({
    ...productQueries.list({
      page_index: 0,
      page_size: 100,
    }),
  })

  const { data: customerList } = useQuery({
    ...customerQueries.list({
      page_index: 0,
      page_size: 100,
    }),
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
    const productMap = (productList?.data || []).reduce<Record<string, ProductItem>>((acc, item) => {
      acc[item.id] = item
      return acc
    }, {})
    const normalizedProducts = (values.products || []).map((item) => ({
      [ProductFields.ProductId]: item.product_id,
      [ProductFields.Amount]: Math.max(1, Number(item.amount || 1)),
      unit_price: Number(item.unit_price ?? productMap[item.product_id]?.price ?? 0),
    }))
    const totalAmount = (values.products || []).reduce((total, item) => {
      const amount = Number(item.amount || 0)
      const productPrice = Number(item.unit_price ?? productMap[item.product_id]?.price ?? 0)
      return total + amount * productPrice
    }, 0)

    const existingOrder = orderDetail?.data
    const defaultCustomer = customerList?.data?.[0]
    const vatAmount = Number(existingOrder?.vat_amount || 0)
    const amountPaid = Number(existingOrder?.amount_paid || 0)
    const totalAmountWithVat = totalAmount + vatAmount
    const data: CreateOrderParams = {
      order_code: values.order_id,
      customer_id: existingOrder?.customer_id || defaultCustomer?.id || 'walk-in-customer',
      order_date: dayjs(values.order_date, 'DD/MM/YYYY HH:mm').toISOString(),
      due_date: existingOrder?.due_date || dayjs(values.order_date, 'DD/MM/YYYY HH:mm').toISOString(),
      order_type: existingOrder?.order_type || OrderType.Retail,
      delivery_address: existingOrder?.delivery_address || defaultCustomer?.address || 'In-store',
      vat_rate: existingOrder?.vat_rate || 0,
      vat_amount: vatAmount,
      total_amount: totalAmount,
      total_amount_with_vat: totalAmountWithVat,
      amount_paid: amountPaid,
      debt_amount: Math.max(totalAmountWithVat - amountPaid, 0),
      payment_method: existingOrder?.payment_method || 'cash',
      status: existingOrder?.status || OrderStatus.Draft,
      note: JSON.stringify(normalizedProducts),
    }

    if (id) {
      update({ ...data, id })
    } else {
      create(data)
    }
  }

  const onSave = () => {
    form.validateFields().then((values) => handleSubmit(values)).catch(() => undefined)
  }

  useEffect(() => {
    if (!formVisible) {
      return
    }

    if (!id) {
      form.setFieldsValue(createInitialValues())
      return
    }

    if (orderDetail?.data) {
      const productMap = (productList?.data || []).reduce<Record<string, ProductItem>>((acc, item) => {
        acc[item.id] = item
        return acc
      }, {})
      const fallbackProducts = createInitialValues()[FormFields.Products]

      form.setFieldsValue({
        [FormFields.OrderId]: orderDetail.data.order_code,
        [FormFields.OrderDate]: dayjs(orderDetail.data.order_date).format('DD/MM/YYYY HH:mm'),
        [FormFields.Products]: parseOrderProducts(orderDetail.data.note, fallbackProducts).map((item) => ({
          ...item,
          unit_price: item.unit_price ?? Number(productMap[item.product_id]?.price ?? 0),
        })),
      })
    }
  }, [form, formVisible, id, orderDetail, productList])

  return {
    id,
    form,
    formVisible,
    onSave,
    handleClose,
  }
}

export default useDrawer
