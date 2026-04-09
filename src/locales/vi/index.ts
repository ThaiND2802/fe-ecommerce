import setting from './setting'
import importModule from './import'
import management from './management'

const vi = {
  translation: {
    common: {
      validation: {
        required: 'Thông tin này không được để trống',
        duplicated: 'Giá trị này đã được sử dụng',
      },
      message: {
        apiFailed: 'Xảy ra lỗi! Vui lòng thử lại',
        noAccess: 'Bạn không được cấp quyền xem nội dung này!',
      },
      text: {
        noData: 'Không có dữ liệu',
      },
      errorCode: {
        403: 'Bạn không có quyền truy cập nội dung này',
      },
    },

    changePassword: {
      title: 'Thay đổi mật khẩu',
      button: {
        save: 'Lưu',
        cancel: 'Hủy',
      },
      label: {
        oldPassword: 'Mật khẩu cũ',
        newPassword: 'Mật khẩu mới',
        confirmPassword: 'Xác nhận mật khẩu',
      },
      message: {
        requiredField: 'Vui lòng nhập mật khẩu cũ',
        requiredLength: 'Mật khẩu phải có ít nhất 8 ký tự',
        passwordMismatch: 'Mật khẩu xác nhận không khớp',
        changePasswordSuccess: 'Mật khẩu đã được thay đổi thành công',
        changePasswordFail: 'Thay đổi mật khẩu thất bại',
      },
    },

    language: {
      vi: 'Tiếng Việt',
      en: 'Tiếng Anh',
      viShort: 'Vie',
      enShort: 'Eng',
    },

    profile: {
      title: 'Hồ sơ cá nhân',
      button: {
        save: 'Lưu',
        cancel: 'Hủy',
      },
      label: {
        oldPassword: 'Mật khẩu cũ',
        newPassword: 'Mật khẩu mới',
        confirmPassword: 'Xác nhận mật khẩu',
        management: 'Quản lý',
        ext: 'Số điện thoại',
        dataStartWork: 'Ngày bắt đầu',
        digitalSign: 'Chữ ký số',

        information: {
          staffId: 'Mã nhân viên',
          phone: 'Số điện thoại',
          email: 'Email',
          companyName: 'Công ty',
          job: 'Chức danh',
          position: 'Chức vụ',
          manager: 'Quản lý',
          ext: 'Ext',
          startDate: 'Ngày vào làm',
        },
      },
    },

    login: {
      label: {
        signIn: 'Đăng nhập',
        username: 'Tên đăng nhập',
        password: 'Mật khẩu',
        dividerLabel: 'hoặc',
        forgotPassword: 'Quên mật khẩu?',
        google: 'Google',
        facebook: 'Facebook',
      },
      button: {
        login: 'Đăng nhập',
        ssoLogin: 'Đăng nhập với MSM SSO',
      },
      message: {
        loginFail: 'Đăng nhập thất bại',
        loginSuccess: 'Đăng nhập thành công',
        requiredUsername: 'Vui lòng nhập tên đăng nhập',
        requiredPassword: 'Vui lòng nhập mật khẩu',
      },
    },

    header: {
      userDropdown: {
        employeeInfo: 'Thông tin nhân viên',
        defaultCompany: 'Công ty mặc định',
        changeLanguage: 'Thay đổi ngôn ngữ',
        logout: 'Đăng xuất',
        viewAccount: 'Xem tài khoản',
        changePassword: 'Thay đổi mật khẩu',
      },
    },

    notifications: {
      title: 'Thông báo',
      tab: {
        all: 'Tất cả',
        unread: 'Chưa đọc',
      },
      viewAll: 'Xem tất cả',
      from: 'Từ',
      markReadAll: 'Đánh dấu tất cả đã đọc',
    },

    menu: {
      home: 'Home',

      management: 'Quản lý',
      customer: 'Khách hàng',
      order: 'Đơn hàng',
      category: 'Danh mục',
      product: 'Sản phẩm',
      inventory: 'Tồn kho',
      inventoryLog: 'Nhật ký tồn kho',
      codeGenerator: 'Bộ sinh mã',
      setting: 'Cấu hình',
      generalSetting: 'Cấu hình chung',
    },

    ...setting,
    ...importModule,
    ...management,
  },
}

export default vi
