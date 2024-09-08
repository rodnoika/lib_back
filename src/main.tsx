import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Nav from './Nav.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Nav />
  </StrictMode>,
)
