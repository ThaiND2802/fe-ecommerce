import { Dropdown as AntdDropdown, DropdownProps } from 'antd'
import classNames from 'classnames'

import styles from './index.module.less'

interface IProps extends DropdownProps {}

const Index = ({ overlayClassName, ...props }: IProps) => {
  return <AntdDropdown overlayClassName={classNames(styles.overlay, overlayClassName)} {...props} />
}

export default Index
