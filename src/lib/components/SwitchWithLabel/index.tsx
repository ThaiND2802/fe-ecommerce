import { Flex, Switch, SwitchProps } from 'antd'

import useLocale from 'src/lib/locales/useLocale'

import styles from './index.module.less'

interface Props extends SwitchProps {
  label?: boolean
  yesLabel?: string
  noLabel?: string
}

const Index = ({ label = true, yesLabel, noLabel, ...props }: Props) => {
  const [t] = useLocale('common')
  return (
    <Flex align="center">
      <Switch {...props} />
      {label && (
        <span className={styles.label}>
          {props.value ? yesLabel || t.text.yes : noLabel || t.text.no}
        </span>
      )}
    </Flex>
  )
}

export default Index
