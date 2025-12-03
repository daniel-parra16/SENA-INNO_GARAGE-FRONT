import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import "./Layout.css";
import { FaHome, FaUsers, FaClipboardList, FaTools, FaBoxes, FaUserCircle } from "react-icons/fa";
import LogoutModal from "../components/Layout/Logout";

function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const location = useLocation();

  // Detecta la ruta para marcar activo
  const currentPath = location.pathname;

  const menuItems = [
    { label: "Home", icon: <FaHome />, path: "/landing" },
    { label: "Users", icon: <FaUsers />, path: "/users" },
    { label: "Cotizaciones", icon: <FaClipboardList />, path: "/cotizaciones" },
    { label: "Ordenes", icon: <FaTools />, path: "/ordenes" },
    { label: "Inventario", icon: <FaBoxes />, path: "/inventario" }
  ];

  return (
    <div className="layout">
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>

        <div className="logo-container">
          <img
            src="/public/logo.png"
            alt="logo"
            className={`logo-img ${collapsed ? "collapsed-logo" : ""}`}
          />

          {!collapsed && (
            <div className="logo-text">
              <span>INNO</span>
              <span>GARAGE</span>
            </div>
          )}
        </div>

        <nav>
          {menuItems.map((item) => (
            <Link to={item.path} key={item.path} style={{ textDecoration: "none" }}>
              <div
                className={`menu-item ${
                  currentPath === item.path ? "active" : ""
                }`}
              >
                {item.icon}
                {!collapsed && <span className="menu-label">{item.label}</span>}
              </div>
            </Link>
          ))}
        </nav>
      </aside>

      <div className="layout-main">

        <header className="topbar">
          <button className="menu-btn" onClick={() => setCollapsed(!collapsed)}>
            ☰
          </button>

          <div onClick={ () => setLogoutModal(true) } className="profile">
            <FaUserCircle size={24} />
            <span >Daniel</span>
          </div>
        </header>

        {/* CONTENT */}
        <main className="content">
          <Outlet />
        </main>

        {logoutModal && <LogoutModal onclose={() => setLogoutModal(false)} />}

      </div>
    </div>
  );
}

export default Layout;