import { Flex } from 'antd'
import SimpleBar from 'simplebar-react'
import cn from 'classnames'

import Page from 'src/lib/components/Page'
import ResizableContainer from 'src/lib/components/ResizableContainer'

import styles from './index.module.less'

interface PageWithRightSidebarProps {
  main: React.ReactNode
  sidebar?: React.ReactNode
  sidebarWidth?: number
  sidebarMinWidth?: number
  sidebarMaxWidth?: number
  disableResize?: boolean
  border?: boolean
  sidebarPadding?: number
  classNames?: {
    page?: string
    main?: string
    sidebar?: string
  }
}
const Index = ({
  main,
  sidebar,
  sidebarWidth = 350,
  sidebarMinWidth = 350,
  sidebarMaxWidth = 450,
  disableResize = false,
  border = true,
  sidebarPadding = 16,
  classNames = {},
}: PageWithRightSidebarProps) => {
  return (
    <Page
      className={cn(styles.page, classNames.page, { [styles.border]: border })}
      noPadding
      columnLayout
      style={{
        position: 'relative',
      }}>
      <Flex vertical className={classNames.main} style={{ flex: 1, minWidth: 0 }}>
        {main}
      </Flex>
      {sidebar && (
        <ResizableContainer
          className={cn(styles.sidebar, classNames.sidebar)}
          initialWidth={sidebarWidth}
          minWidth={sidebarMinWidth}
          maxWidth={sidebarMaxWidth}
          disableResize={disableResize}
          leftExpand={true}
          {...(sidebarPadding
            ? {
                style: {
                  padding: sidebarPadding,
                  paddingRight: 0,
                  '--simplebar-padding': `${sidebarPadding}px`,
                } as React.CSSProperties,
              }
            : {})}>
          <SimpleBar style={{ height: '100%' }}>{sidebar}</SimpleBar>
        </ResizableContainer>
      )}
    </Page>
  )
}

export default Index
