// Archivo: landingPage.jsx
import React from 'react';
import './landingPage.css';
import dashboardImg from '../../assets/Dashboard.png';

export default function LandingPage() {
  return (
    <div className="wp-landing">
      <header className="wp-header">
        <div className="wp-header-inner">
          <div className="logo">Workshop Pro</div>
          <nav className="nav">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
            <button className="cta">Probar Gratis</button>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-left">
            <h1>Optimiza tu taller mecánico con nuestro software profesional</h1>
            <p>
              Gestiona reparaciones, clientes, inventario y facturación de forma fácil y
              eficiente. Aumenta tu productividad y mejora la satisfacción de tus
              clientes.
            </p>
            <div className="hero-ctas">
              <button className="btn primary">Probar Gratis</button>
              <button className="btn ghost">Ver Precios</button>
            </div>
          </div>
          <div className="hero-right">
            {/* Reemplaza la ruta por la de tu imagen en public o importa la imagen */}
            <div className="mock-device">
              <img src={dashboardImg} alt="dashboard" />
            </div>
          </div>
        </section>

        <section id="features" className="features">
          <h2>Todo lo que necesitas para gestionar tu taller</h2>
          <p className="sub">Nuestro software está diseñado para simplificar cada aspecto de la gestión de tu taller mecánico.</p>

          <div className="cards">
            <article className="card">
              <div className="card-ico">🔧</div>
              <h3>Gestión de Reparaciones</h3>
              <p>Crea y sigue órdenes de trabajo con tiempos estimados y estados.</p>
            </article>

            <article className="card">
              <div className="card-ico">📅</div>
              <h3>Agenda Automatizada</h3>
              <p>Organiza citas, planifica y evita solapamientos con recordatorios automáticos.</p>
            </article>

            <article className="card">
              <div className="card-ico">📦</div>
              <h3>Inventario Inteligente</h3>
              <p>Controla repuestos, niveles mínimos y proveedores.</p>
            </article>

            <article className="card">
              <div className="card-ico">💳</div>
              <h3>Facturación Rápida</h3>
              <p>Genera facturas profesionales y gestionalas en pocos clics.</p>
            </article>
          </div>
        </section>

        <section className="grid-screens">
          <div className="screen">{/* mini screenshot placeholder */}
            <img src="/screen.png" alt="s1" />
            <p>Órdenes de trabajo detalladas</p>
          </div>
          <div className="screen">
            <img src="/screen.png" alt="s2" />
            <p>Gestión de clientes y vehículos</p>
          </div>
          <div className="screen">
            <img src="/screen.png" alt="s3" />
            <p>Control total de tu inventario</p>
          </div>
          <div className="screen">
            <img src="/screen.png" alt="s4" />
            <p>Reportes y analíticas</p>
          </div>
        </section>

        <section className="testimonials">
          <h2>Lo que dicen nuestros clientes</h2>
          <div className="testi-grid">
            <blockquote className="testi">
              <p>“Este software ha transformado mi taller. Antes tenía todo desordenado, ahora todo está bajo control.”</p>
              <cite>Juan Pérez — Dueño, Taller Pérez</cite>
            </blockquote>

            <blockquote className="testi">
              <p>“La gestión de inventario es increíble. Mi inventario ya no se pierde y la facturación es mucho más rápida.”</p>
              <cite>María García — Gerente, AutoFix</cite>
            </blockquote>

            <blockquote className="testi">
              <p>“Fácil de usar y muy potente. El soporte técnico respondió rápidamente.”</p>
              <cite>Carlos Rodríguez — Mecánico Jefe, ServiCar</cite>
            </blockquote>
          </div>
        </section>

        <section id="pricing" className="pricing">
          <h2>Planes y Precios Flexibles</h2>
          <p className="sub">Elige el plan que mejor se adapte al tamaño y necesidades de tu taller.</p>

          <div className="pricing-grid">
            <div className="price-card">
              <h3>Básico</h3>
              <p className="price">$29<span>/mes</span></p>
              <ul>
                <li>Gestión de órdenes</li>
                <li>Base de clientes</li>
                <li>Soporte por email</li>
              </ul>
              <button className="btn ghost">Empezar</button>
            </div>

            <div className="price-card featured">
              <div className="badge">Más Popular</div>
              <h3>Pro</h3>
              <p className="price">$59<span>/mes</span></p>
              <ul>
                <li>Todo en Básico</li>
                <li>Agenda y Calendario</li>
                <li>Reportes Avanzados</li>
              </ul>
              <button className="btn primary">Empezar Ahora</button>
            </div>

            <div className="price-card">
              <h3>Premium Taller</h3>
              <p className="price">$99<span>/mes</span></p>
              <ul>
                <li>Multi-sede</li>
                <li>Integraciones API</li>
                <li>Soporte dedicado</li>
              </ul>
              <button className="btn ghost">Contactar</button>
            </div>
          </div>
        </section>

        <section id="faq" className="faq">
          <h2>Preguntas Frecuentes</h2>
          <div className="faq-list">
            <details>
              <summary>¿Necesito instalar algo?</summary>
              <p>No, el software es cloud y se accede desde el navegador.</p>
            </details>
            <details>
              <summary>¿Mis datos están seguros?</summary>
              <p>Usamos cifrado y respaldos automáticos para proteger tu información.</p>
            </details>
            <details>
              <summary>¿Ofrecen soporte técnico?</summary>
              <p>Sí, soporte por email y planes con soporte prioritario.</p>
            </details>
            <details>
              <summary>¿Hay contrato de permanencia?</summary>
              <p>No, se puede cancelar en cualquier momento.</p>
            </details>
          </div>
        </section>
      </main>

      <footer className="wp-footer">
        <div className="footer-inner">
          <div>© 2024 Workshop Pro. Todos los derechos reservados.</div>
          <div className="footer-links">
            <a href="#contact">Contacto</a>
            <a href="#legal">Legal</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

