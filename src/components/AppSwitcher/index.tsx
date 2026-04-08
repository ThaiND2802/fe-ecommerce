import { Popover, Flex } from 'antd'

import IconWrapper from 'src/components/IconWrapper'
import Icon from 'src/components/Icon'
import ScrollContainer from 'src/components/ScrollContainer'

import { ModuleInfo } from 'src/entities/modules/types'
import { ModulesListStore } from 'src/store/modules'

import { VITE_APP_TENANT_ID } from 'src/environments/environment'

import Ellipsis from '../Ellipsis'
import styles from './index.module.less'

const { systemModule } = globalThis.moduleConfig

const AppList = () => {
  const modules = ModulesListStore.value

  const handleClick = (module: ModuleInfo) => {
    if (module.path_url) {
      globalThis.location.href = `${module.path_url?.replace('{tenant}', VITE_APP_TENANT_ID)}`
    }
  }

  return (
    <ScrollContainer className={styles.container}>
      <div className={styles.appListContainer}>
        <div className={styles.appList}>
          {modules.map((module) => (
            <Flex
              key={module.module_id}
              className={styles.appItem}
              onClick={() => {
                handleClick(module)
              }}>
              <img
                src={`data:image/png;base64,${module.icon}`}
                alt={module.title}
                className={styles.appIcon}
              />
              <Ellipsis line={2} className={styles.appName}>
                {module.title}
              </Ellipsis>
            </Flex>
          ))}
        </div>
      </div>
    </ScrollContainer>
  )
}

const Index = () => {
  if (systemModule) return null
  return (
    <Popover
      classNames={{ root: styles.popover }}
      content={<AppList />}
      trigger="click"
      placement="bottomRight"
      align={{ offset: [100, 0] }}
      arrow={false}>
      <IconWrapper>
        <Icon name="dots9" size={24} />
      </IconWrapper>
    </Popover>
  )
}

export default Index
