export interface IContactDetail {
  id: string
}

export interface IFileImportInfo {
  file_path: string
  sheets: string[]
  session_id: string
}

export enum EImportType {
  INSERT = 1,
  UPDATE = 2,
  INSERT_AND_UPDATE = 3,
}

export interface IEntityField {
  field_name: string
  display_name: string
  is_required: boolean
  data_type: string
}
export interface IImportFieldInfo {
  entity_fields: IEntityField[]
  excel_fields: string[]
}

export enum EExportType {
  ALL = 1,
  ERRORS_ONLY = 2,
  SUCCESS_ONLY = 3,
}
