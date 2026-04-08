import { Popover, PopoverProps } from 'antd'

import Contact from './contact'

import styles from './index.module.less'

export interface ContactPopoverProps extends PopoverProps {
  userId: string
}

const Index = ({ userId, ...props }: ContactPopoverProps) => {
  return (
    <Popover
      classNames={{
        body: styles.popoverBody,
      }}
      content={<Contact userId={userId} />}
      mouseEnterDelay={0.6}
      {...props}
    />
  )
}

export default Index
