import { Form, Row, Col, InputNumber } from 'antd'

import FormItem from '../../../FormItem'
import FileSelect from '../../../FileSelect'
import Link from '../../../Link'
import useLocale from '../../../../locales/useLocale'

import Title from '../../components/Title'
import SheetSelect from '../../components/SheetSelect'
import Container from '../../components/Container'

import { useForm, EFormField, useSelectFileStep, useTemplateDownloader } from './hooks.tsx'
import styles from '../style.module.less'

const SelectFile = ({
  description,
  templateApiUrl,
  uploadApiUrl,
  fileType,
  fileSize,
}: {
  description?: string
  templateApiUrl: string
  uploadApiUrl: string
  fileType: string
  fileSize: number
}) => {
  const [t, trans] = useLocale('Import')
  const { form, isFetching } = useForm({ uploadApiUrl })
  useSelectFileStep(form)

  const templateDownloader = useTemplateDownloader(templateApiUrl)

  const onTemplateDownload = () => {
    templateDownloader.download()
  }

  return (
    <div>
      <Title>{t.step.selectFile}</Title>

      <div className={styles.description}>
        {t.selectFile.templateDescription}{' '}
        <Link onClick={onTemplateDownload}>{t.selectFile.templateDownload}</Link>
      </div>
      {description && <div className={styles.description}>{description}</div>}

      <Container style={{ marginTop: 20 }}>
        <Form form={form} layout="vertical">
          <FormItem
            name={EFormField.SourceFile}
            label={t.selectFile.label.sourceFile}
            rules={[{ required: true, message: trans('common.validation.required') }]}>
            <FileSelect
              autoUpload={false}
              multiple={false}
              clickable={false}
              autoHideUpload
              accept={fileType}
              maxSize={fileSize}
            />
          </FormItem>

          <div style={{ overflow: 'hidden' }}>
            <Row gutter={16}>
              <Col span={16}>
                <FormItem
                  name={EFormField.SheetName}
                  label={t.selectFile.label.sheetName}
                  rules={[{ required: true, message: trans('common.validation.required') }]}>
                  <SheetSelect
                    placeholder={t.selectFile.placeholder.sheetName}
                    loading={isFetching}
                  />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  name={EFormField.HeaderRow}
                  label={t.selectFile.label.headerRow}
                  rules={[{ required: true, message: trans('common.validation.required') }]}
                  initialValue={1}>
                  <InputNumber min={1} precision={0} style={{ width: '100%' }} />
                </FormItem>
              </Col>
            </Row>
          </div>
        </Form>
      </Container>
    </div>
  )
}

export default SelectFile
