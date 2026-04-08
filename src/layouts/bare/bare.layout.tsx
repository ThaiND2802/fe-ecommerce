import React from 'react'
import { Row, Col } from 'antd'
import { Outlet } from 'react-router-dom'
import styles from './bare.layout.module.less'

const BareLayout: React.FC = () => {
  return (
    <Row className={styles.container} align={'middle'} justify={'center'}>
      <div className={styles.content}>
        <Row gutter={[0, 24]}>
          <Col span={24}>
            <Outlet />
          </Col>
        </Row>
      </div>
    </Row>
  )
}

export default BareLayout
