// import { createRoot } from 'react-dom/client'

// import App from './module'
// import './index.less'

// declare global {
//   interface Window {
//     moduleRender: () => void
//     moduleUnmount: () => void
//     moduleConfig: {
//       name: Record<string, string>
//       theme: {
//         token: Record<string, unknown>
//         components: Record<string, unknown>
//       }
//       responsive?: boolean
//     }
//   }
// }

// let root = null
// globalThis.moduleRender = () => {
//   const rootElement = document.getElementById('module-container')
//   if (rootElement) {
//     root = createRoot(rootElement)
//     root.render(<App />)
//   }
// }

// globalThis.moduleUnmount = () => {
//   if (root) {
//     root.unmount()
//   }
// }

// if (document.getElementById('module-container')) {
//   globalThis.moduleRender()
// }

import { createRoot } from 'react-dom/client'

// import { VITE_APP_ENV, VITE_SENTRY_DSN } from './environments/environment'
import App from './module'

import './index.less'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Failed to find the root element')
}

const root = createRoot(rootElement)
root.render(<App />)
