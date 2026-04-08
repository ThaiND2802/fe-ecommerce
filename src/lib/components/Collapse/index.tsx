import { Collapse as AntdCollapse, CollapseProps } from 'antd'
import classNames from 'classnames'

import styles from './index.module.less'

const Collapse = ({ className, ...props }: CollapseProps) => {
  return <AntdCollapse className={classNames(styles.collapse, className)} {...props} />
}

export default Collapse
