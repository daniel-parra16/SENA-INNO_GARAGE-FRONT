
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login/Login.jsx'
import Forgot from './Pages/Forgot/Forgot.jsx'
import Register from './Pages/Register/Register.jsx'
import Landing from './Pages/Landing/Landing.jsx'
import LandingPage from './Pages/LandingPage/LandingPage.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/landingpage" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
