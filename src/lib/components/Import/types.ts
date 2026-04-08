import { EImportType } from '../../entities/import/types'

export enum IMPORT_STEP {
  SELECT_FILE = 'select-file',
  CONFIGURATION = 'configuration',
  FIELD_MAPPING = 'field-mapping',
  IMPORT = 'import',
}

export interface IImportOptions {
  importType: EImportType
  emptyData: boolean
  defaultLanguage: boolean
}
