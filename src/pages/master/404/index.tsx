import { Flex } from 'antd'

import NotFoundImage from 'src/assets/images/404.svg'

import styles from './index.module.less'

const NotFoundPage = () => {
  return (
    <Flex
      className={styles.container}
      align="center"
      justify="center"
      vertical
      style={{ height: '100%' }}>
      <img src={NotFoundImage} alt="" style={{ maxWidth: 600, width: '100%' }} />
    </Flex>
  )
}

export default NotFoundPage
