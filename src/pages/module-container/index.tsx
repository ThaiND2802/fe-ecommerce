import { useEffect } from 'react'

import Firebase from './firebase'

const ModuleContainer = () => {
  useEffect(() => {
    globalThis?.moduleRender?.()
  }, [])

  return (
    <>
      <Firebase />
      <div id="module-container" style={{ height: '100%' }}></div>
    </>
  )
}

export default ModuleContainer
