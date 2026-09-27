import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AmbianceProvider } from './context/AmbianceContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AmbianceProvider>
      <App />
    </AmbianceProvider>
  </StrictMode>,
)
