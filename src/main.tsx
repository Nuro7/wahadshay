import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { LanguageProvider } from './i18n/LanguageContext'

const root = createRoot(document.getElementById('root')!)

root.render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)

// Dismiss the inline HTML splash (from index.html) once React has painted its
// first frame. We use two nested rAFs so React has actually committed to the DOM
// before we start fading out.
// This is the bridge between the instant HTML splash and React's own Preloader.
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    const inlineSplash = document.getElementById('splash-inline')
    if (!inlineSplash) return

    // Trigger the CSS fade-out transition
    inlineSplash.classList.add('splash-hiding')

    // Remove from DOM after transition completes (400ms matches CSS transition)
    setTimeout(() => {
      inlineSplash.remove()
    }, 420)
  })
})
