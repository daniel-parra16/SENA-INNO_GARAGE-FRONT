import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import "./Layout.css";
import { FaHome, FaUsers, FaClipboardList, FaTools, FaBoxes, FaUserCircle } from "react-icons/fa";

export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
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
      {/* SIDEBAR */}
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        
        {/* LOGO */}
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

        {/* MENU */}
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

      {/* BODY */}
      <div className="layout-main">
        
        {/* TOPBAR */}
        <header className="topbar">
          <button className="menu-btn" onClick={() => setCollapsed(!collapsed)}>
            ☰
          </button>

          <div className="profile">
            <FaUserCircle size={32} />
            <span>Daniel</span>
          </div>
        </header>

        {/* CONTENT */}
        <main className="content">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
