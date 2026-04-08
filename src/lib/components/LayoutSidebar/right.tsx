import { CSSProperties } from 'react'
import { Flex, FlexProps } from 'antd'
import cn from 'classnames'

import ResizableContainer from '../ResizableContainer'
import ScrollContainer from '../ScrollContainer'
import { useResizeDetect } from '../../hooks/resize-detect'

const { responsive } = globalThis.moduleConfig

import styles from './index.module.less'

interface RigtSidebarLayoutProps extends Omit<FlexProps, 'children'> {
  main: React.ReactNode
  sidebar?: React.ReactNode
  sidebarWidth?: number
  sidebarMinWidth?: number
  sidebarMaxWidth?: number
  disableResize?: boolean
  classNames?: {
    main?: string
    sidebar?: string
  }
  breakpoints?: number[]
  responsiveHideSidebar?: boolean
  styleProps?: {
    main?: CSSProperties
    sidebar?: CSSProperties
  }
  reverseLayout?: boolean
}

const Index = ({
  className,
  main,
  sidebar,
  sidebarWidth = 350,
  sidebarMinWidth = 350,
  sidebarMaxWidth = 450,
  disableResize = true,
  classNames = {},
  responsiveHideSidebar = false,
  breakpoints = [],
  styleProps,
  reverseLayout = false,
  ...props
}: RigtSidebarLayoutProps) => {
  const { ref, useBreakpoint } = useResizeDetect({
    breakpoints,
    enable: breakpoints?.length > 0,
  })

  const breakpoint = useBreakpoint()
  const isFullWidthLayout = breakpoints?.length && breakpoint === 0

  const renderContent = () => {
    return (
      <Flex
        className={cn(styles.contentWrapper, {
          [styles.sidebarRight]: !isFullWidthLayout,
          [styles.reverse]: isFullWidthLayout && reverseLayout,
        })}>
        <Flex vertical className={cn(styles.main, classNames.main)} style={styleProps?.main}>
          {main}
        </Flex>
        {sidebar && (
          <ResizableContainer
            className={cn(
              styles.resizable,
              {
                [styles.fullWidth]: isFullWidthLayout,
              },
              classNames.sidebar,
            )}
            initialWidth={sidebarWidth}
            minWidth={sidebarMinWidth}
            maxWidth={sidebarMaxWidth}
            disableResize={disableResize || isFullWidthLayout}
            leftExpand={true}
            style={styleProps?.sidebar}>
            {sidebar}
          </ResizableContainer>
        )}
      </Flex>
    )
  }

  return (
    <Flex
      ref={ref}
      className={cn(styles.layout, className, {
        [styles.hideSidebar]: responsive && responsiveHideSidebar,
        [styles.column]: !isFullWidthLayout,
        'full-width-layout': isFullWidthLayout,
        'sidebar-layout': !isFullWidthLayout,
      })}
      {...props}>
      <ScrollContainer className={styles.scrollContainer} fullHeight={!isFullWidthLayout}>
        {renderContent()}
      </ScrollContainer>
    </Flex>
  )
}

export default Index
