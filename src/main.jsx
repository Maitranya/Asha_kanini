import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Analytics from './Analytics.jsx'

// Simple path-based view switch — no router needed.
// "/analytics" (or "/analytics.html", in case it's bookmarked) shows the
// Analytics UI inside the SAME single-page app/build, everything else shows App.
const path = window.location.pathname
const isAnalytics = path.startsWith('/analytics')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isAnalytics ? <Analytics /> : <App />}
  </StrictMode>,
)
