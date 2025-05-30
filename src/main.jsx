import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppWrapper } from './store/state.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <AppWrapper>
      <StrictMode>
        <App />
      </StrictMode>
  </AppWrapper>,
)
