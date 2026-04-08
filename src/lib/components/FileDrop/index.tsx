import { Upload, Button, DraggerProps, Flex } from 'antd'

import { formatFileSize } from 'src/lib/utils/file'

import Icon from '../Icon'
import useLocale from '../../locales/useLocale'

import styles from './index.module.less'

export interface IProps extends DraggerProps {
  hint?: string
  maxSize?: number
}

const { Dragger } = Upload

const FileDrop = ({ hint, ...props }: IProps) => {
  const [t, trans] = useLocale('FileDrop')

  return (
    <Dragger className={styles.container} fileList={[]} customRequest={() => null} {...props}>
      <Flex gap={4} align="center" className={styles.dragAndDrop}>
        <Icon name="upload-cloud" size={24} />
        <span>
          <span>{t.dragAndDropOr}</span>
          <Button className={styles.browse} type="link">
            {t.browse}
          </Button>
        </span>
      </Flex>
      <p className={styles.hint}>{trans(t.format, { format: props.accept })}</p>
      <p className={styles.hint}>{trans(t.size, { size: formatFileSize(props.maxSize) })}</p>
    </Dragger>
  )
}

export default FileDrop
