import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { UserProvider } from './context/userContext.tsx'
import PreferenceProvider from './context/prefContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  
  <React.StrictMode>
    <BrowserRouter>
    <UserProvider>
      <PreferenceProvider>
       <App />
      </PreferenceProvider>
    </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
