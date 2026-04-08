import { signal } from '@preact/signals-react'

import { ModuleInfo } from 'src/entities/modules/types'

const ModulesStore = signal<Record<string, ModuleInfo>>({})
const ModulesListStore = signal<ModuleInfo[]>([])

export default ModulesStore

export { ModulesListStore }
