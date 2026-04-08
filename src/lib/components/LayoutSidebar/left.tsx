import { CSSProperties } from 'react'
import { Flex, FlexProps } from 'antd'
import cn from 'classnames'

import ResizableContainer from '../ResizableContainer'
import ScrollContainer from '../ScrollContainer'
import { useResizeDetect } from '../../hooks/resize-detect'

const { responsive } = globalThis.moduleConfig

import styles from './index.module.less'

interface LeftSidebarLayoutProps extends Omit<FlexProps, 'children'> {
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
  ...props
}: LeftSidebarLayoutProps) => {
  const { ref, useBreakpoint } = useResizeDetect({
    breakpoints,
    enable: breakpoints?.length > 0,
  })

  const breakpoint = useBreakpoint()
  const isFullWidthLayout = breakpoints?.length && breakpoint === 0

  const renderContent = () => {
    return (
      <>
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
            disableResize={disableResize}
            leftExpand={false}
            style={styleProps?.sidebar}>
            {sidebar}
          </ResizableContainer>
        )}
        <Flex vertical className={cn(styles.main, classNames.main)} style={styleProps?.main}>
          {main}
        </Flex>
      </>
    )
  }

  return (
    <Flex
      ref={ref}
      className={cn(styles.layout, className, {
        [styles.hideSidebar]: responsive && responsiveHideSidebar,
        [styles.column]: !isFullWidthLayout,
        'full-width-layout': isFullWidthLayout,
      })}
      {...props}>
      {isFullWidthLayout ? (
        <ScrollContainer fullHeight>{renderContent()}</ScrollContainer>
      ) : (
        renderContent()
      )}
    </Flex>
  )
}

export default Index
