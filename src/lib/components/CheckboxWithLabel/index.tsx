import { Checkbox, CheckboxProps, Flex } from 'antd'
import useLocale from 'src/lib/locales/useLocale'
import styles from './index.module.less'
import { useState } from 'react'

interface Props extends CheckboxProps {
  label?: boolean
  yesLabel?: string
  noLabel?: string
}

const Index = ({ label = true, yesLabel, noLabel, value, checked, onChange, ...props }: Props) => {
  const [t] = useLocale('common')
  const [checkboxChecked, setCheckboxChecked] = useState(value || checked)

  const handleChange = (e: any) => {
    setCheckboxChecked(e.target.checked)
    onChange?.(e)
  }

  return (
    <Flex align="center">
      <Checkbox {...props} checked={checkboxChecked} onChange={handleChange} />
      {label && (
        <span className={styles.label}>
          {checkboxChecked ? yesLabel || t.text.yes : noLabel || t.text.no}
        </span>
      )}
    </Flex>
  )
}

export default Index
