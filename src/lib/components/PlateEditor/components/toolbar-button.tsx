import cn from 'classnames'

import styles from './toolbar-button.module.less'

interface ToolbarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children: React.ReactNode
  pressed?: boolean
}

const ToolbarButton = ({ className, children, pressed, ...props }: ToolbarButtonProps) => {
  return (
    <button
      type="button"
      className={cn(styles.button, className, { [styles.pressed]: pressed })}
      {...props}>
      {children}
    </button>
  )
}

export default ToolbarButton
