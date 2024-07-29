import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { UserProvider } from './context/userContext.tsx'
import PreferenceProvider from './context/prefContext.tsx'
import NewsProvider from './context/newsContext.tsx'
import CategoryProvider from './context/catContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <BrowserRouter>z
      <UserProvider>
        <PreferenceProvider>
          <CategoryProvider>
            <NewsProvider>
              <App />
            </NewsProvider>
          </CategoryProvider>
        </PreferenceProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
