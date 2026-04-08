const vi = {
  translation: {
    setting: {
      dateFormat: 'DD/MM/YYYY',
      dateTimeFormat: 'DD/MM/YYYY HH:mm',
    },
    button: {
      cancel: 'Hủy',
      confirm: 'Xác nhận',
      save: 'Lưu',
      create: 'Tạo mới',
      delete: 'Xóa',
      close: 'Đóng',
      import: 'Import',
      export: 'Export',
      filter: 'Lọc',
      columns: 'Hiển thị cột',
    },
    common: {
      button: {
        save: 'Lưu',
        close: 'Đóng',
        cancel: 'Hủy',
        confirm: 'Xác nhận',
        add: 'Thêm',
        delete: 'Xóa',
        edit: 'Sửa',
        agree: 'Đồng ý',
        share: 'Chia sẻ',
      },
      message: {
        apiFailed: 'Xảy ra lỗi! Vui lòng thử lại',
        sendSuccess: 'Đã gửi thành công',
        sendFail: 'Gửi thất bại. Vui lòng thử lại',
        createSuccess: 'Đã tạo thành công',
        createFail: 'Tạo thất bại. Vui lòng thử lại',
        updateSuccess: 'Đã chỉnh sửa thành công',
        updateFail: 'Chỉnh sửa thất bại. Vui lòng thử lại',
        deleteSuccess: 'Đã xóa thành công',
        deleteFail: 'Xóa thất bại. Vui lòng thử lại',
        downloading: 'Đang tải tệp...',
        saveSuccess: 'Đã lưu thành công',
        saveFail: 'Lưu thất bại. Vui lòng thử lại',
        noAccess: 'Bạn không có quyền truy cập nội dung này',
      },
      text: {
        yes: 'Có',
        no: 'Không',
        edit: 'Sửa',
        delete: 'Xóa',
        noData: 'Không có dữ liệu',
      },
      validation: {
        required: 'Thông tin này không được để trống',
        fileUploading: 'Tệp đang tải lên',
        fileUploadError: 'Tải tệp thất bại',
      },
    },

    Table: {
      button: {
        clear: 'Xóa lọc',
        showColumn: 'Hiển thị cột',
        groupData: 'Nhóm dữ liệu',
      },
      placeholder: {
        search: 'Tìm kiếm',
      },
      pagination: {
        showTotal: 'Hiển thị {{from}} đến {{to}} của {{total}} bản ghi',
      },
    },

    Confirmation: {
      undoneWarning: 'Tác vụ này không thể hoàn tác',
      deleteQuestion: 'Bạn có chắc chắn muốn xóa "{{entry}}" không?',
    },

    FileUploader: {
      errors: {
        fileInvalid: 'Tệp không hợp lệ',
        fileSizeExceeded: 'Kích thước tệp vượt quá giới hạn',
        fileUploadFailed: 'Tải tệp thất bại',
      },
    },

    FileDrop: {
      dragAndDropOr: 'Kéo và thả tệp vào đây hoặc',
      browse: 'Browse',
      format: 'Định dạng {{format}}',
      size: 'Dung lượng tối đa {{size}}',
    },

    SelectSearch: {
      addNew: 'Thêm mới',
    },

    Modal: {
      ok: 'Lưu',
      cancel: 'Hủy',
    },

    Attachments: {
      downloadAll: 'Tải xuống tất cả',

      validation: {
        fileUploading: 'Tệp đang tải lên',
        fileUploadError: 'Tải tệp thất bại',
      },
    },

    InlineMemberSelector: {
      placeholder: 'Chọn thành viên',
      searchPlaceholder: 'Tìm kiếm thành viên',
    },

    Comment: {
      button: {
        send: 'Gửi',
        attachFile: 'Đính kèm tệp',
        close: 'Đóng',
      },
      placeholder: {
        comment: 'Thêm bình luận',
      },
    },

    StackMemberSelect: {
      members: '{{count}} thành viên',
    },

    UserGroupSelector: {
      title: 'Người dùng và nhóm',
      placeholder: {
        company: 'Chọn công ty',
        user: 'Chọn thành viên',
        search: 'Tìm kiếm',
        searchSelectedMember: 'Tên, chức danh, email',
      },
      button: {
        add: 'Thêm',
      },
      label: {
        userList: 'Danh sách',
      },
      text: {
        selectTooltip: 'Chọn lại thành viên trong nhóm',
        members: '{{count}} thành viên',
        expired: 'có {{count}} thành viên hết hạn license',
      },
      memberListPopup: {
        title: 'Người dùng',
        placeholder: {
          search: 'Tên, chức danh, email',
        },
      },
    },

    TableColumnSelect: {
      title: 'Trường dữ liệu',
      searchPlaceholder: 'Tìm trường dữ liệu',
      show: 'Hiển thị',
      hideAll: 'Ẩn tất cả',
      hidden: 'Ẩn',
    },

    RequestFlow: {
      delegation: 'Đã uỷ quyền cho {{name}}',
      recievedDate: 'Ngày tiếp nhận: {{date}}',
      processedDate: 'Ngày xử lý: {{date}}',
    },

    Copy: {
      copied: 'Đã sao chép',
    },

    PrintModal: {
      print: 'In',
    },

    Oops: {
      error: 'Xảy ra lỗi! Vui lòng thử lại',
      reloadPage: 'Tải lại trang',
      noAccess: 'Bạn không có quyền truy cập nội dung này',
      disconnected: 'Bạn đã bị ngắt kết nối với máy chủ. Vui lòng thử lại sau.',
    },

    ContactPopover: {
      info: 'Thông tin',
    },

    FilterPopover: {
      title: 'Lọc',
      button: {
        clear: 'Xóa trắng',
        apply: 'Áp dụng',
      },
      label: {
        list: 'Danh sách',
        other: 'Khác',
      },
    },

    SearchPopover: {
      placeholder: {
        search: 'Tìm kiếm',
      },
    },

    Import: {
      title: 'Import',
      button: {
        cancel: 'Hủy',
        import: 'Import',
        back: 'Trở về',
        continue: 'Tiếp tục',
      },
      step: {
        selectFile: 'Tải lên tệp nguồn',
        configuration: 'Thiết lập nhập khẩu',
        fieldMapping: 'Ghép cột dữ liệu',
        import: 'Kiểm tra dữ liệu',
      },
      selectFile: {
        templateDescription: 'Để có kết quả nhập khẩu chính xác, hãy sử dụng tệp mẫu',
        templateDownload: 'Tải xuống tệp mẫu',
        label: {
          sourceFile: 'Tải lên tệp nguồn',
          sheetName: 'Sheet nhập khẩu',
          headerRow: 'Dòng tiêu đề',
        },
        placeholder: {
          sheetName: 'Chọn sheet',
        },
      },
      configuration: {
        insertOptions: {
          insertAndUpdate: 'Đồng thời cập nhật và thêm mới',
          update: 'Cập nhật',
          insert: 'Thêm mới',
        },
        label: {
          importType: 'Cột dữ liệu trong tệp nguồn',
          emptyData: 'Không cập nhật dữ liệu trống vào các trường thông tin có giá trị',
          defaultLanguage:
            'Dữ liệu bắt buộc nếu không có nhập ngôn ngữ phụ, hệ thống sẽ tự động điền dữ liệu ngôn ngữ mặc định và hiển thị',
        },
      },
      fieldMapping: {
        description: 'Chọn cột dữ liệu trên tệp nguồn để ghép nối dữ liệu trên hệ thống',
        label: {
          systemField: 'Cột dữ liệu trên hệ thống',
          importedField: 'Cột dữ liệu trong tệp nguồn',
        },
      },
      import: {
        description: 'Vui lòng kiểm tra dữ liệu đã ghép trước khi nhập khẩu',
        label: {
          list: 'Danh sách',
          total: 'Tổng',
          valid: 'Hợp lệ',
          invalid: 'Không hợp lệ',
        },
        message: {
          validating: 'Vui lòng đợi đến khi quá trình kiểm tra hoàn tất',
          success: 'Danh sách đã được import thành công vào hệ thống',
          error: 'Import thất bại, vui lòng thử lại',
        },
      },
      export: {
        download: 'Tải xuống',
        all: 'Tất cả',
        errorsOnly: 'Dòng lỗi',
      },
    },
    PlateEditor: {
      link: {
        insert: 'Chèn liên kết',
        edit: 'Sửa liên kết',
        example: 'https://example.com',
        urlLabel: 'URL',
        urlRequired: 'Vui lòng nhập URL',
        urlPlaceholder: 'https://example.com',
        ok: 'OK',
        cancel: 'Hủy',
        invalidUrl: 'URL không hợp lệ',
      },
      image: {
        uploadError: 'Chỉ có thể upload file ảnh',
        sizeError: 'Kích thước file không được vượt quá 10MB',
      },
      table: {
        backgroundColor: 'Màu nền',
        selectSize: 'Chọn kích thước bảng',
        selectTable: 'Chọn bảng {{rows}} x {{cols}}',
        mergeCells: 'Gộp ô',
        splitCell: 'Tách ô',
        insertRowBefore: 'Chèn hàng phía trên',
        insertRowAfter: 'Chèn hàng phía dưới',
        deleteRow: 'Xóa hàng',
        insertColumnBefore: 'Chèn cột bên trái',
        insertColumnAfter: 'Chèn cột bên phải',
        deleteColumn: 'Xóa cột',
        deleteTable: 'Xóa bảng',
        cellBorders: 'Viền ô',
        borders: {
          top: 'Viền trên',
          right: 'Viền phải',
          bottom: 'Viền dưới',
          left: 'Viền trái',
          none: 'Không viền',
          outside: 'Viền ngoài',
        },
      },
      heading: {
        placeholder: 'Heading',
        paragraph: 'Paragraph',
        heading1: 'Heading 1',
        heading2: 'Heading 2',
        heading3: 'Heading 3',
        heading4: 'Heading 4',
        heading5: 'Heading 5',
        heading6: 'Heading 6',
      },
      list: {
        placeholder: 'List',
        none: 'None',
        bullet: 'Bullet List',
        number: 'Number List',
      },
    },
  },
}

export default vi
