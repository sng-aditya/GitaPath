import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import { SnackbarProvider } from './components/SnackbarProvider'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <SnackbarProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>
)
