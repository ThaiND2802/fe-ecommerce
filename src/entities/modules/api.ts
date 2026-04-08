import request from 'src/api/request'
import { ENDPOINT } from 'src/constants/api'
import { APP_GATEWAY } from 'src/environments/environment'
import { ModuleInfo } from './types'

export const getModuleList = () => {
  return request<ModuleInfo[]>({
    url: `${APP_GATEWAY}${ENDPOINT.SUBSCRIPTION_MODULES}`,
    method: 'GET',
    showError: false,
  })
}
