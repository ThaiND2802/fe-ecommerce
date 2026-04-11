export default {
  customer: {
    title: {
      page: 'Customer',
      create: 'Create Customer',
      edit: 'Edit Customer',
    },
    search: {
      placeholder: 'Search Customer',
    },
    button: {
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
    },
    text: {
      input: 'Input',
    },
    table: {
      columns: {
        no: 'No.',
        code: 'Code',
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        address: 'Address',
        tax_code: 'Tax Code',
        contact_person: 'Contact Person',
        credit_limit: 'Credit Limit',
        current_debt: 'Current Debt',
        customer_type: 'Customer Type',
      },
      actions: {
        edit: 'Edit',
        delete: 'Delete',
      },
    },
    form: {
      code: 'Code',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      tax_code: 'Tax Code',
      contact_person: 'Contact Person',
      credit_limit: 'Credit Limit',
      current_debt: 'Current Debt',
      customer_type: 'Customer Type',
    },
    customer_type: {
      customer: 'Customer',
      supplier: 'Supplier',
      both: 'Both',
    },
    validation: {
      required: 'This field is required',
    },
  },
  user: {
    title: {
      page: 'User',
      create: 'Create User',
      edit: 'Edit User',
    },
    search: {
      placeholder: 'Search User',
    },
    button: {
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
    },
    text: {
      input: 'Input',
    },
    table: {
      columns: {
        no: 'No.',
        id: 'ID',
        full_name: 'Full Name',
        email: 'Email',
        phone: 'Phone',
        image: 'Image',
        gender: 'Gender',
        date_of_birth: 'Date Of Birth',
        address: 'Address',
        department_id: 'Department',
        position_id: 'Position',
        job_title_id: 'Job Title',
        avatar_url: 'Avatar URL',
        hire_date: 'Hire Date',
        refresh_token: 'Refresh Token',
        refresh_token_expiry_time: 'Refresh Token Expiry Time',
        is_active: 'Active Status',
      },
      actions: {
        edit: 'Edit',
        delete: 'Delete',
      },
    },
    form: {
      id: 'ID',
      full_name: 'Full Name',
      email: 'Email',
      phone: 'Phone',
      image: 'Image',
      gender: 'Gender',
      date_of_birth: 'Date Of Birth',
      address: 'Address',
      department_id: 'Department',
      position_id: 'Position',
      job_title_id: 'Job Title',
      avatar_url: 'Avatar URL',
      hire_date: 'Hire Date',
      refresh_token: 'Refresh Token',
      refresh_token_expiry_time: 'Refresh Token Expiry Time',
      is_active: 'Active Status',
    },
    validation: {
      required: 'This field is required',
    },
  },
  order: {
    title: {
      page: 'Order',
      create: 'Create Order',
      edit: 'Edit Order',
    },
    search: {
      placeholder: 'Search Order',
    },
    button: {
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
    },
    text: {
      input: 'Input',
    },
    table: {
      columns: {
        no: 'No.',
        order_code: 'Order Code',
        customer_id: 'Customer ID',
        order_date: 'Order Date',
        due_date: 'Due Date',
        order_type: 'Order Type',
        delivery_address: 'Delivery Address',
        vat_rate: 'VAT Rate',
        vat_amount: 'VAT Amount',
        total_amount: 'Total Amount',
        total_amount_with_vat: 'Total Amount With VAT',
        amount_paid: 'Amount Paid',
        debt_amount: 'Debt Amount',
        payment_method: 'Payment Method',
        status: 'Status',
        note: 'Note',
      },
      actions: {
        edit: 'Edit',
        delete: 'Delete',
      },
    },
    form: {
      order_code: 'Order Code',
      customer_id: 'Customer ID',
      order_date: 'Order Date',
      due_date: 'Due Date',
      order_type: 'Order Type',
      delivery_address: 'Delivery Address',
      vat_rate: 'VAT Rate',
      vat_amount: 'VAT Amount',
      total_amount: 'Total Amount',
      total_amount_with_vat: 'Total Amount With VAT',
      amount_paid: 'Amount Paid',
      debt_amount: 'Debt Amount',
      payment_method: 'Payment Method',
      status: 'Status',
      note: 'Note',
    },
    order_type: {
      retail: 'Retail',
      wholesale: 'Wholesale',
      online: 'Online',
    },
    status: {
      draft: 'Draft',
      confirmed: 'Confirmed',
      waiting_delivery: 'Waiting Delivery',
      delivering: 'Delivering',
      completed: 'Completed',
      delivery_failed: 'Delivery Failed',
      cancelled: 'Cancelled',
    },
    validation: {
      required: 'This field is required',
    },
  },
  category: {
    title: {
      page: 'Category',
      create: 'Create Category',
      edit: 'Edit Category',
    },
    search: {
      placeholder: 'Search Category',
    },
    button: {
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
    },
    text: {
      input: 'Input',
    },
    table: {
      columns: {
        no: 'No.',
        id: 'ID',
        name: 'Name',
        description: 'Description',
        status: 'Status',
      },
      actions: {
        edit: 'Edit',
        delete: 'Delete',
      },
    },
    form: {
      id: 'ID',
      name: 'Name',
      description: 'Description',
      status: 'Status',
    },
    status: {
      inactive: 'Inactive',
      active: 'Active',
      deleted: 'Deleted',
    },
    validation: {
      required: 'This field is required',
    },
  },
  product: {
    title: {
      page: 'Product',
      create: 'Create Product',
      edit: 'Edit Product',
    },
    search: {
      placeholder: 'Search Product',
    },
    button: {
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
    },
    text: {
      input: 'Input',
    },
    table: {
      columns: {
        no: 'No.',
        id: 'ID',
        code: 'Code',
        name: 'Name',
        description: 'Description',
        unit: 'Unit',
        price: 'Price',
        cost_price: 'Cost Price',
        image_url: 'Image URL',
        category_id: 'Category',
        is_active: 'Active Status',
      },
      actions: {
        edit: 'Edit',
        delete: 'Delete',
      },
    },
    form: {
      id: 'ID',
      code: 'Code',
      name: 'Name',
      description: 'Description',
      unit: 'Unit',
      price: 'Price',
      cost_price: 'Cost Price',
      image_url: 'Image URL',
      category_id: 'Category',
      is_active: 'Active Status',
    },
    boolean: {
      active: 'Active',
      inactive: 'Inactive',
    },
    validation: {
      required: 'This field is required',
    },
  },
  tenant: {
    title: {
      page: 'Tenant',
      create: 'Create Tenant',
      edit: 'Edit Tenant',
    },
    search: {
      placeholder: 'Search Tenant',
    },
    button: {
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
    },
    text: {
      input: 'Input',
    },
    table: {
      columns: {
        no: 'No.',
        id: 'ID',
        name: 'Name',
        schema: 'Schema',
      },
      actions: {
        edit: 'Edit',
        delete: 'Delete',
      },
    },
    form: {
      id: 'ID',
      name: 'Name',
      schema: 'Schema',
    },
    validation: {
      required: 'This field is required',
    },
  },
  inventory: {
    title: {
      page: 'Inventory',
      create: 'Create Inventory',
      edit: 'Edit Inventory',
    },
    search: {
      placeholder: 'Search Inventory',
    },
    button: {
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
    },
    text: {
      input: 'Input',
    },
    table: {
      columns: {
        no: 'No.',
        id: 'ID',
        product_id: 'Product',
        quantity: 'Quantity',
        reserved_quantity: 'Reserved Quantity',
        available_quantity: 'Available Quantity',
        reorder_level: 'Reorder Level',
        last_updated: 'Last Updated',
      },
      actions: {
        edit: 'Edit',
        delete: 'Delete',
      },
    },
    form: {
      id: 'ID',
      product_id: 'Product',
      quantity: 'Quantity',
      reserved_quantity: 'Reserved Quantity',
      available_quantity: 'Available Quantity',
      reorder_level: 'Reorder Level',
      last_updated: 'Last Updated',
    },
    validation: {
      required: 'This field is required',
    },
  },
  orderItem: {
    title: {
      page: 'Order Item',
      create: 'Create Order Item',
      edit: 'Edit Order Item',
    },
    search: {
      placeholder: 'Search Order Item',
    },
    button: {
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
    },
    text: {
      input: 'Input',
    },
    table: {
      columns: {
        no: 'No.',
        id: 'ID',
        order_id: 'Order',
        product_id: 'Product',
        coefficient_0: 'Coefficient 0',
        coefficient_1: 'Coefficient 1',
        coefficient_2: 'Coefficient 2',
        coefficient_3: 'Coefficient 3',
        coefficient_4: 'Coefficient 4',
        coefficient_5: 'Coefficient 5',
        quantity: 'Quantity',
        unit_price: 'Unit Price',
        total: 'Total',
      },
      actions: {
        edit: 'Edit',
        delete: 'Delete',
      },
    },
    form: {
      id: 'ID',
      order_id: 'Order',
      product_id: 'Product',
      coefficient_0: 'Coefficient 0',
      coefficient_1: 'Coefficient 1',
      coefficient_2: 'Coefficient 2',
      coefficient_3: 'Coefficient 3',
      coefficient_4: 'Coefficient 4',
      coefficient_5: 'Coefficient 5',
      quantity: 'Quantity',
      unit_price: 'Unit Price',
      total: 'Total',
    },
    validation: {
      required: 'This field is required',
    },
  },
  inventoryLog: {
    title: {
      page: 'Inventory Log',
      create: 'Create Inventory Log',
      edit: 'Edit Inventory Log',
    },
    search: {
      placeholder: 'Search Inventory Log',
    },
    button: {
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
    },
    text: {
      input: 'Input',
    },
    table: {
      columns: {
        no: 'No.',
        id: 'ID',
        inventory_id: 'Inventory',
        movement_type: 'Movement Type',
        quantity: 'Quantity',
        balance: 'Balance',
        reference_id: 'Reference ID',
        reference_type: 'Reference Type',
        notes: 'Notes',
      },
      actions: {
        edit: 'Edit',
        delete: 'Delete',
      },
    },
    form: {
      id: 'ID',
      inventory_id: 'Inventory',
      movement_type: 'Movement Type',
      quantity: 'Quantity',
      balance: 'Balance',
      reference_id: 'Reference ID',
      reference_type: 'Reference Type',
      notes: 'Notes',
    },
    validation: {
      required: 'This field is required',
    },
  },
  codeGenerator: {
    title: {
      page: 'Code Generator',
      create: 'Create Code Generator',
      edit: 'Edit Code Generator',
    },
    search: {
      placeholder: 'Search Code Generator',
    },
    button: {
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
    },
    text: {
      input: 'Input',
    },
    table: {
      columns: {
        no: 'No.',
        id: 'ID',
        prefix: 'Prefix',
        last_number: 'Last Number',
        created_at: 'Created At',
        updated_at: 'Updated At',
      },
      actions: {
        edit: 'Edit',
        delete: 'Delete',
      },
    },
    form: {
      id: 'ID',
      prefix: 'Prefix',
      last_number: 'Last Number',
      created_at: 'Created At',
      updated_at: 'Updated At',
    },
    validation: {
      required: 'This field is required',
    },
  },
}
