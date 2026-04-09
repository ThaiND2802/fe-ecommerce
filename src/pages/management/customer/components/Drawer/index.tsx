import { DrawerWithScroll } from "src/lib/components/Drawer"
import Form from "../Form"
import useLocaleGroup from "src/locales/useLocaleGroup"

import styles from './index.module.less'
import useDrawer from "./hook"
import Button from "src/lib/components/Button"
import { useMemo } from "react"
import { Divider } from "antd"

const Index = () => {
  const [t] = useLocaleGroup('customer')

  const { id, form, onSave, formVisible, handleClose } = useDrawer()

  const title = useMemo(() => {
    return id ? t.title.edit : t.title.create
  }, [id])

  const extra = useMemo(() => {
    return (
      <>
        <Button type="primary" onClick={onSave}>
          {t.button.save}
        </Button>
        <Divider type="vertical" />
      </>
    )
  }, [])

  return (
    <DrawerWithScroll
      className={styles.drawer}
      width={400}
      title={title}
      extra={extra}
      open={formVisible}
      onClose={handleClose}>
      <Form form={form} />
    </DrawerWithScroll>
  )
}
export default Index