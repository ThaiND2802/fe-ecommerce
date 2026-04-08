import { Menu as AntdMenu, MenuProps as AntdMenuProps } from 'antd'
import classNames from 'classnames'

import styles from './index.module.less'

export interface MenuProps extends AntdMenuProps {}

const Menu = ({ className, ...otherProps }: MenuProps) => {
  return <AntdMenu className={classNames(styles.menu, className)} {...otherProps} />
}

export default Menu
