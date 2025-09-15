import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UserProvider } from './contexts/UserContext.jsx'
import { IsEditOpenProvider } from './contexts/IsEditOpenContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <IsEditOpenProvider>

        <App />


      </IsEditOpenProvider>
    </UserProvider>
  </StrictMode>,
)
