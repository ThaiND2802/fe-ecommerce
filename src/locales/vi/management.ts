export default {
  customer: {
    title: {
      page: 'Khách hàng',
      create: 'Thêm khách hàng',
      edit: 'Sửa khách hàng',
    },
    search: {
      placeholder: 'Tìm kiếm khách hàng',
    },
    button: {
      edit: 'Sửa',
      delete: 'Xóa',
      save: 'Lưu',
    },
    text: {
      input: 'Nhập',
    },
    table: {
      columns: {
        code: 'Mã',
        name: 'Tên',
        email: 'Email',
        phone: 'Số điện thoại',
        address: 'Địa chỉ',
        tax_code: 'Mã số thuế',
        contact_person: 'Người liên hệ',
        credit_limit: 'Giới hạn tín dụng',
        current_debt: 'Nợ hiện tại',
        customer_type: 'Loại khách hàng',
      },
      actions: {
        edit: 'Sửa',
        delete: 'Xóa',
      },
      form: {
        no: 'STT',
        code: 'Mã',
        name: 'Tên',
        email: 'Email',
        phone: 'Số điện thoại',
        address: 'Địa chỉ',
        tax_code: 'Mã số thuế',
        contact_person: 'Người liên hệ',
        credit_limit: 'Giới hạn tín dụng',
        current_debt: 'Nợ hiện tại',
        customer_type: 'Loại khách hàng',
      },
      customer_type: {
        customer: 'Khách hàng',
        supplier: 'Nhà cung cấp',
        both: 'Khách hàng và nhà cung cấp',
      },
      validation: {
        required: 'Thông tin này không được để trống',
      },
    },
  }
  ,
  order: {
    title: {
      page: 'Đơn hàng',
      create: 'Thêm đơn hàng',
      edit: 'Sửa đơn hàng',
    },
    search: {
      placeholder: 'Tìm kiếm đơn hàng',
    },
    button: {
      edit: 'Sửa',
      delete: 'Xóa',
      save: 'Lưu',
    },
    text: {
      input: 'Nhập',
    },
    table: {
      columns: {
        no: 'STT',
        order_code: 'Mã đơn hàng',
        customer_id: 'Mã khách hàng',
        order_date: 'Ngày đặt',
        due_date: 'Ngày đến hạn',
        order_type: 'Loại đơn',
        delivery_address: 'Địa chỉ giao hàng',
        vat_rate: 'Thuế VAT',
        vat_amount: 'Tiền VAT',
        total_amount: 'Tổng tiền',
        total_amount_with_vat: 'Tổng tiền gồm VAT',
        amount_paid: 'Đã thanh toán',
        debt_amount: 'Công nợ',
        payment_method: 'Phương thức thanh toán',
        status: 'Trạng thái',
        note: 'Ghi chú',
      },
      actions: {
        edit: 'Sửa',
        delete: 'Xóa',
      },
    },
    form: {
      order_code: 'Mã đơn hàng',
      customer_id: 'Mã khách hàng',
      order_date: 'Ngày đặt',
      due_date: 'Ngày đến hạn',
      order_type: 'Loại đơn',
      delivery_address: 'Địa chỉ giao hàng',
      vat_rate: 'Thuế VAT',
      vat_amount: 'Tiền VAT',
      total_amount: 'Tổng tiền',
      total_amount_with_vat: 'Tổng tiền gồm VAT',
      amount_paid: 'Đã thanh toán',
      debt_amount: 'Công nợ',
      payment_method: 'Phương thức thanh toán',
      status: 'Trạng thái',
      note: 'Ghi chú',
    },
    order_type: {
      retail: 'Bán lẻ',
      wholesale: 'Bán sỉ',
      online: 'Trực tuyến',
    },
    status: {
      draft: 'Nháp',
      confirmed: 'Đã xác nhận',
      waiting_delivery: 'Chờ giao hàng',
      delivering: 'Đang giao hàng',
      completed: 'Hoàn tất',
      delivery_failed: 'Giao thất bại',
      cancelled: 'Đã hủy',
    },
    validation: {
      required: 'Thông tin này không được để trống',
    },
  },
  category: {
    title: {
      page: 'Danh mục',
      create: 'Thêm danh mục',
      edit: 'Sửa danh mục',
    },
    search: {
      placeholder: 'Tìm kiếm danh mục',
    },
    button: {
      edit: 'Sửa',
      delete: 'Xóa',
      save: 'Lưu',
    },
    text: {
      input: 'Nhập',
    },
    table: {
      columns: {
        no: 'STT',
        id: 'Mã',
        name: 'Tên',
        description: 'Mô tả',
        status: 'Trạng thái',
      },
      actions: {
        edit: 'Sửa',
        delete: 'Xóa',
      },
    },
    form: {
      id: 'Mã',
      name: 'Tên',
      description: 'Mô tả',
      status: 'Trạng thái',
    },
    status: {
      inactive: 'Ngưng hoạt động',
      active: 'Hoạt động',
      deleted: 'Đã xóa',
    },
    validation: {
      required: 'Thông tin này không được để trống',
    },
  },
  product: {
    title: {
      page: 'Sản phẩm',
      create: 'Thêm sản phẩm',
      edit: 'Sửa sản phẩm',
    },
    search: {
      placeholder: 'Tìm kiếm sản phẩm',
    },
    button: {
      edit: 'Sửa',
      delete: 'Xóa',
      save: 'Lưu',
    },
    text: {
      input: 'Nhập',
    },
    table: {
      columns: {
        no: 'STT',
        id: 'Mã',
        code: 'Code',
        name: 'Tên',
        description: 'Mô tả',
        unit: 'Đơn vị',
        price: 'Giá bán',
        cost_price: 'Giá vốn',
        image_url: 'URL ảnh',
        category_id: 'Danh mục',
        is_active: 'Trạng thái',
      },
      actions: {
        edit: 'Sửa',
        delete: 'Xóa',
      },
    },
    form: {
      id: 'Mã',
      code: 'Code',
      name: 'Tên',
      description: 'Mô tả',
      unit: 'Đơn vị',
      price: 'Giá bán',
      cost_price: 'Giá vốn',
      image_url: 'URL ảnh',
      category_id: 'Danh mục',
      is_active: 'Trạng thái',
    },
    boolean: {
      active: 'Hoạt động',
      inactive: 'Ngưng hoạt động',
    },
    validation: {
      required: 'Thông tin này không được để trống',
    },
  },
  inventory: {
    title: {
      page: 'Tồn kho',
      create: 'Thêm tồn kho',
      edit: 'Sửa tồn kho',
    },
    search: {
      placeholder: 'Tìm kiếm tồn kho',
    },
    button: {
      edit: 'Sửa',
      delete: 'Xóa',
      save: 'Lưu',
    },
    text: {
      input: 'Nhập',
    },
    table: {
      columns: {
        no: 'STT',
        id: 'Mã',
        product_id: 'Sản phẩm',
        quantity: 'Số lượng',
        reserved_quantity: 'Số lượng giữ chỗ',
        available_quantity: 'Số lượng khả dụng',
        reorder_level: 'Ngưỡng nhập lại',
        last_updated: 'Cập nhật lần cuối',
      },
      actions: {
        edit: 'Sửa',
        delete: 'Xóa',
      },
    },
    form: {
      id: 'Mã',
      product_id: 'Sản phẩm',
      quantity: 'Số lượng',
      reserved_quantity: 'Số lượng giữ chỗ',
      available_quantity: 'Số lượng khả dụng',
      reorder_level: 'Ngưỡng nhập lại',
      last_updated: 'Cập nhật lần cuối',
    },
    validation: {
      required: 'Thông tin này không được để trống',
    },
  },
  inventoryLog: {
    title: {
      page: 'Nhật ký tồn kho',
      create: 'Thêm nhật ký tồn kho',
      edit: 'Sửa nhật ký tồn kho',
    },
    search: {
      placeholder: 'Tìm kiếm nhật ký tồn kho',
    },
    button: {
      edit: 'Sửa',
      delete: 'Xóa',
      save: 'Lưu',
    },
    text: {
      input: 'Nhập',
    },
    table: {
      columns: {
        no: 'STT',
        id: 'Mã',
        inventory_id: 'Tồn kho',
        movement_type: 'Loại biến động',
        quantity: 'Số lượng',
        balance: 'Số dư',
        reference_id: 'Mã tham chiếu',
        reference_type: 'Loại tham chiếu',
        notes: 'Ghi chú',
      },
      actions: {
        edit: 'Sửa',
        delete: 'Xóa',
      },
    },
    form: {
      id: 'Mã',
      inventory_id: 'Tồn kho',
      movement_type: 'Loại biến động',
      quantity: 'Số lượng',
      balance: 'Số dư',
      reference_id: 'Mã tham chiếu',
      reference_type: 'Loại tham chiếu',
      notes: 'Ghi chú',
    },
    validation: {
      required: 'Thông tin này không được để trống',
    },
  },
  codeGenerator: {
    title: {
      page: 'Bộ sinh mã',
      create: 'Thêm bộ sinh mã',
      edit: 'Sửa bộ sinh mã',
    },
    search: {
      placeholder: 'Tìm kiếm bộ sinh mã',
    },
    button: {
      edit: 'Sửa',
      delete: 'Xóa',
      save: 'Lưu',
    },
    text: {
      input: 'Nhập',
    },
    table: {
      columns: {
        no: 'STT',
        id: 'Mã',
        prefix: 'Tiền tố',
        last_number: 'Số cuối',
        created_at: 'Ngày tạo',
        updated_at: 'Ngày cập nhật',
      },
      actions: {
        edit: 'Sửa',
        delete: 'Xóa',
      },
    },
    form: {
      id: 'Mã',
      prefix: 'Tiền tố',
      last_number: 'Số cuối',
      created_at: 'Ngày tạo',
      updated_at: 'Ngày cập nhật',
    },
    validation: {
      required: 'Thông tin này không được để trống',
    },
  },
}