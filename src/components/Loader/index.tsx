import { Flex, Spin } from 'antd'
import React from 'react'

const Loader: React.FC = () => {
  return (
    <Flex
      justify="center"
      align="center"
      style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0 }}>
      <Spin />
    </Flex>
  )
}

export default Loader
