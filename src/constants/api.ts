export enum HTTP_STATUS_RESPONSE_KEY {
  SUCCESS = 200,
  UPDATE_SUCCESS = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  AUTHORIZATION = 401,
  FORBIDDEN = 403,
  UNKNOWN = 500,
}
export enum ERROR_CODE {
  NO_ACCESS = 1501,
  LOGIN_FAILED = 1103,
}
export enum ENDPOINT {
  ROOT = '/',

  //Authentication
  LOGIN = '/v0/authenticate/token',
  REFRESH_TOKEN = '/v1/authenticate/refresh-token',

  //profile
  PROFILE = '/v0/user/current-user/info',
  CHANGE_PASSWORD = '/v0/authenticate/change-password',

  //notification
  NOTIFICATIONS = '/notification/api/v1/notification/management/gets',
  NOTIFICATIONS_UNREAD_COUNT = '/notification/api/v1/notification/management/count',
  NOTIFICATIONS_READ = '/notification/api/v1/notification/management/{id}/mark-read',
  NOTIFICATIONS_READ_ALL = '/notification/api/v1/notification/management/mark-read-all',
  NOTIFICATIONS_REGISTER_FIREBASE_TOKEN = '/notification/api/v1/notification/token/register',

  MOUDLES = '/v0/user-module/quick-access',
  SUBSCRIPTION_MODULES = '/user-management/api/v1/user-module/quick-access',
}

export const ANNOUNCEMENT_LIST_PAGE_SIZE = 50

export const IMPORT_DOWNLOAD_FILE_TEMPLATE_API = '/staff/api/v1/import/load-template'
export const IMPORT_UPLOAD_FILE_API = '/staff/api/v1/import/upload'
export const IMPORT_GET_FIELDS_API = '/staff/api/v1/import/get-field'
export const IMPORT_VALIDATE_DATA_API = '/staff/api/v1/import/validate'
export const IMPORT_GET_DATA_API = '/staff/api/v1/import/get-validated-data'
export const IMPORT_SUBMIT_API = '/staff/api/v1/import/execute'
export const IMPORT_EXPORT_DATA_API = '/staff/api/v1/import/get-import-result'
