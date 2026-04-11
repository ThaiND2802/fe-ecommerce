import setting from './setting'
import importModule from './import'
import management from './management'

const en = {
  translation: {
    common: {
      validation: {
        required: 'This field is required',
        duplicated: 'The value is already in use',
      },
      message: {
        apiFailed: 'An error occurred! Please try again',
        noAccess: 'You are not authorized to access this page!',
      },
      text: {
        noData: 'No data',
      },
      errorCode: {
        403: 'You are not authorized to access this content',
      },
    },
    changePassword: {
      title: 'Change Password',
      button: {
        save: 'Save',
        cancel: 'Cancel',
      },
      label: {
        oldPassword: 'Old Password',
        newPassword: 'New Password',
        confirmPassword: 'Confirm Password',
      },
      message: {
        requiredField: 'Please enter your old password',
        requiredLength: 'Password must be at least 8 characters',
        passwordMismatch: 'The confirmation password does not match the new password',
        changePasswordSuccess: 'Password changed successfully',
        changePasswordFail: 'Password change failed',
      },
    },

    language: {
      vi: 'Vietnamese',
      en: 'English',
      viShort: 'Vie',
      enShort: 'Eng',
    },

    profile: {
      title: 'Profile',
      button: {
        save: 'Save',
        cancel: 'Cancel',
      },
      label: {
        oldPassword: 'Old Password',
        newPassword: 'New Password',
        confirmPassword: 'Confirm Password',
        management: 'Management',
        ext: 'Ext',
        dataStartWork: 'Start Date',
        digitalSign: 'Digital Signature',

        information: {
          staffId: 'Staff ID',
          phone: 'Phone Number',
          email: 'Email',
          companyName: 'Company Name',
          job: 'Job Title',
          position: 'Position',
          manager: 'Manager',
          ext: 'Ext',
          startDate: 'Start Date',
        },
      },
    },

    login: {
      label: {
        signIn: 'Sign In',
        username: 'Username',
        password: 'Password',
        dividerLabel: 'or',
        forgotPassword: 'Forgot password?',
        google: 'Google',
        facebook: 'Facebook',
      },
      button: {
        login: 'Login',
        ssoLogin: 'Login with MSM SSO',
      },
      message: {
        loginFail: 'Login failed',
        loginSuccess: 'Login successfully',
        requiredUsername: 'Please enter your username',
        requiredPassword: 'Please enter your password',
      },
    },

    header: {
      userDropdown: {
        employeeInfo: 'Employee Info',
        defaultCompany: 'Default Company',
        changeLanguage: 'Change Language',
        logout: 'Logout',
        viewAccount: 'View Account',
        changePassword: 'Change Password',
      },
    },

    notifications: {
      title: 'Notifications',
      tab: {
        all: 'All',
        unread: 'Unread',
      },
      viewAll: 'View All',
      from: 'From',
      markReadAll: 'Mark all as read',
    },

    menu: {
      home: 'Home',

      management: 'Management',
      customer: 'Customer',
      user: 'User',
      tenant: 'Tenant',
      order: 'Order',
      orderItem: 'Order Item',
      category: 'Category',
      product: 'Product',
      inventory: 'Inventory',
      inventoryLog: 'Inventory Log',
      codeGenerator: 'Code Generator',
      setting: 'Setting',
      generalSetting: 'General Setting',
    },

    ...setting,
    ...importModule,
    ...management,
  },
}

export default en
