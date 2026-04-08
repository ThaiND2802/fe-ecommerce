import { HTMLAttributes } from 'react'
import { Flex } from 'antd'
import classNames from 'classnames'

import SystemPage from '../SystemPage'
import s from './index.module.less'

interface PageProps extends HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode
  subHeader?: React.ReactNode
  noPadding?: boolean
  columnLayout?: boolean
  contentClassName?: string
  topRightRounded?: boolean
  noBorderPrint?: boolean
  styles?: {
    content?: React.CSSProperties
    header?: React.CSSProperties
  }
}

const { responsive } = globalThis.moduleConfig

const Page = ({
  className,
  children,
  header,
  subHeader,
  noPadding,
  columnLayout,
  contentClassName,
  topRightRounded,
  noBorderPrint,
  styles,
  ...props
}: PageProps) => {
  return (
    <Flex
      className={classNames(s.page, className, {
        [s.noPadding]: noPadding,
        [s.columnLayout]: columnLayout,
        [s.topRightRounded]: topRightRounded,
        [s.responsive]: responsive,
        [s.noBorderPrint]: noBorderPrint,
      })}
      {...props}>
      {header && (
        <div className={s.header} style={styles?.header}>
          {header}
        </div>
      )}
      {subHeader && <div className={s.subHeader}>{subHeader}</div>}
      <div className={classNames(s.content, contentClassName)} style={styles?.content}>
        {children}
      </div>
    </Flex>
  )
}

interface PageWithStatusProps extends PageProps {
  loading?: boolean
  error?: boolean
  renderError?: () => React.ReactNode
}
const PageWithStatus = ({ loading, error, renderError, ...props }: PageWithStatusProps) => {
  if (loading) {
    return <SystemPage page="loading" global />
  }
  if (error) {
    return (
      <Page {...props} header={error ? null : props.header}>
        {renderError?.()}
      </Page>
    )
  }
  return <Page {...props} />
}

export default Page
export { PageWithStatus }
