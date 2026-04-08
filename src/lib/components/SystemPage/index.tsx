import { Flex, Spin } from 'antd'

import Page from '../Page'
import Oops from '../Oops/error'
import NoAccess from '../Oops/no-access'

const Index = ({
  page,
  global = false,
  alone = false,
}: {
  page?: 'loading' | 'error' | 'no-permission'
  global?: boolean
  alone?: boolean
}) => {
  return (
    <Page style={alone ? { marginLeft: 16 } : {}}>
      <Flex
        align="center"
        justify="center"
        vertical
        style={
          global
            ? {
                width: '100%',
                height: '100vh',
                position: 'fixed',
                top: 0,
                left: 0,
                userSelect: 'none',
                pointerEvents: 'none',
              }
            : { height: '100%' }
        }>
        {page === 'loading' && <Spin spinning />}
        {page === 'error' && <Oops />}
        {page === 'no-permission' && <NoAccess />}
      </Flex>
    </Page>
  )
}

export default Index
