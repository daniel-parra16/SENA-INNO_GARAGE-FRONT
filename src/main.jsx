import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from'./Pages/login.jsx'
import Forgot from'./Pages/forgot.jsx'
import Register from'./Pages/register.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgotPassword" element={<Forgot />} />
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
