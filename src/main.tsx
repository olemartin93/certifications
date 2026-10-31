import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { registerSW } from 'virtual:pwa-register'
import { App } from './App'
import './index.css'

// Precache the whole app so it works offline; new versions activate automatically.
registerSW({ immediate: true })

const root = document.getElementById('root')
if (!root) throw new Error('Root element not found')

createRoot(root).render(
  <StrictMode>
    {/* Hash routing keeps deep links working on GitHub Pages and offline. */}
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
