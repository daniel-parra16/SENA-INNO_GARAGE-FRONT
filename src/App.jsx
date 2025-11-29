import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login/Login";
import Forgot from "./Pages/Forgot/Forgot";
import Register from "./Pages/Register/Register";
import Layout from "./Layout/Layout";
import Landing from "./Pages/Landing/Landing";
import Users from "./Pages/Users/Users";
import Cotizaciones from "./Pages/Cotizaciones/Cotizaciones";
import Ordenes from "./Pages/Ordenes/Ordenes";
import Inventario from "./Pages/Inventario/Inventario";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* === RUTAS PÚBLICAS === */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/register" element={<Register />} />

        {/* === RUTAS CON LAYOUT === */}
        <Route element={<Layout />}>
          <Route path="landing" element={<Landing />} />
          <Route path="users" element={<Users />} />
          <Route path="cotizaciones" element={<Cotizaciones />} />
          <Route path="ordenes" element={<Ordenes />} />
          <Route path="inventario" element={<Inventario />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
