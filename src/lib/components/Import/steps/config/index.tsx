import { Form, Radio, Checkbox } from 'antd'

import useLocale from '../../../../locales/useLocale'
import FormItem from '../../../FormItem'
import { EImportType } from '../../../../entities/import/types'
import Title from '../../components/Title'
import Container from '../../components/Container'

import { useConfigStep, useForm, EFormField } from './hooks'
import styles from '../style.module.less'

const Config = () => {
  const [t] = useLocale('Import')
  const form = useForm()
  useConfigStep(form)

  return (
    <div>
      <Title>{t.step.configuration}</Title>

      <Container style={{ marginTop: 20 }}>
        <Form form={form} layout="vertical">
          <FormItem
            name={EFormField.ImportType}
            label={t.configuration.label.importType}
            autoMargin
            marginBottom={16}
            initialValue={EImportType.INSERT_AND_UPDATE}>
            <Radio.Group
              className={styles.radioGroup}
              options={[
                {
                  value: EImportType.INSERT_AND_UPDATE,
                  label: t.configuration.insertOptions.insertAndUpdate,
                },
                { value: EImportType.UPDATE, label: t.configuration.insertOptions.update },
                { value: EImportType.INSERT, label: t.configuration.insertOptions.insert },
              ]}
            />
          </FormItem>
          <FormItem
            name={EFormField.EmptyData}
            valuePropName="checked"
            autoMargin
            noMinHeight
            marginBottom={16}>
            <Checkbox className={styles.checkbox}>{t.configuration.label.emptyData}</Checkbox>
          </FormItem>
          <FormItem name={EFormField.DefaultLanguage} valuePropName="checked" noMargin noMinHeight>
            <Checkbox className={styles.checkbox}>{t.configuration.label.defaultLanguage}</Checkbox>
          </FormItem>
        </Form>
      </Container>
    </div>
  )
}

export default Config
