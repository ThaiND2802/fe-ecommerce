import { Form, Flex } from 'antd'

import useLocale from '../../../../locales/useLocale'
import Skeleton from '../../../SkeletonBlock'
import FormItem from '../../../../components/FormItem'
import FieldSelect from '../../components/FieldSelect'

import Title from '../../components/Title'
import Container from '../../components/Container'
import { EFormField, useFieldMappingStep, useForm } from './hooks'

import styles from '../style.module.less'

const FieldMapping = ({
  getImportFieldsApiUrl,
  invisible,
}: {
  getImportFieldsApiUrl: string
  invisible?: boolean
}) => {
  const [t, trans] = useLocale('Import')
  const { form, isFetching, excelFields, entityFields } = useForm({
    getImportFieldsApiUrl,
    visible: !invisible,
  })

  useFieldMappingStep(form)

  const generateSkeleton = () => {
    return (
      <Flex vertical gap={16}>
        {[1, 2, 3].map((_) => (
          <Flex key={_.toString()} gap={16}>
            <div className={styles.fieldName}>
              <Skeleton active block />
            </div>
            <div className={styles.fieldSelector}>
              <Skeleton active block />
            </div>
          </Flex>
        ))}
      </Flex>
    )
  }

  return (
    <div>
      <Title>{t.step.fieldMapping}</Title>

      <div className={styles.description}>{t.fieldMapping.description} </div>

      <Container style={{ marginTop: 20 }}>
        <Form form={form} layout="vertical">
          <Flex className={styles.fieldMappingHeader} gap={16}>
            <div className={styles.fieldMappingHeaderLabel}>{t.fieldMapping.label.systemField}</div>
            <div className={styles.fieldMappingHeaderItem}>
              {t.fieldMapping.label.importedField}
            </div>
          </Flex>
          {isFetching ? (
            generateSkeleton()
          ) : (
            <Form.List name={EFormField.Fields}>
              {(fields) =>
                fields.map((field) => {
                  return (
                    <Flex key={field.key} gap={16}>
                      <FormItem
                        className={styles.fieldName}
                        noMinHeight
                        noMargin
                        name={[field.name, EFormField.FieldName]}>
                        <FieldName required={entityFields[field.name]?.is_required} />
                      </FormItem>
                      <FormItem
                        className={styles.fieldSelector}
                        autoMargin
                        marginBottom={16}
                        name={[field.name, EFormField.ImportedField]}
                        rules={[
                          {
                            required: entityFields[field.name]?.is_required,
                            message: trans('common.validation.required'),
                          },
                        ]}>
                        <FieldSelect options={excelFields} allowClear />
                      </FormItem>
                    </Flex>
                  )
                })
              }
            </Form.List>
          )}
        </Form>
      </Container>
    </div>
  )
}

const FieldName = ({ required, value }: { required: boolean; value?: string }) => {
  return (
    <Flex className={styles.fieldNameLabel} align="center">
      {value} {required && <span className={styles.required}>*</span>}
    </Flex>
  )
}

export default FieldMapping
