import { useMemo } from 'react'
import { Divider } from 'antd'
import Button from 'src/lib/components/Button'
import { DrawerWithScroll } from 'src/lib/components/Drawer'
import useLocaleGroup from 'src/locales/useLocaleGroup'
import Form from '../Form'
import useDrawer from './hook'
import styles from './index.module.less'

const Index = () => {
  const [t] = useLocaleGroup('user')
  const { id, form, onSave, formVisible, handleClose } = useDrawer()

  const title = useMemo(() => {
    return id ? t.title.edit : t.title.create
  }, [id, t.title.create, t.title.edit])

  const extra = useMemo(() => {
    return (
      <>
        <Button type="primary" onClick={onSave}>
          {t.button.save}
        </Button>
        <Divider type="vertical" />
      </>
    )
  }, [onSave, t.button.save])

  return (
    <DrawerWithScroll
      className={styles.drawer}
      width={460}
      title={title}
      extra={extra}
      open={formVisible}
      onClose={handleClose}>
      <Form form={form} isEdit={!!id} />
    </DrawerWithScroll>
  )
}

export default Index
