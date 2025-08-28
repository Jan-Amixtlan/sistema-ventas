import { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <span className="logo-icon">💼</span>
          <span className="logo-text">SistemaVentas</span>
        </div>

        {/* Desktop Menu */}
        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <a href="#home" className="navbar-link">Inicio</a>
          </li>
          <li className="navbar-item">
            <a href="#ventas" className="navbar-link">Ventas</a>
          </li>
          <li className="navbar-item">
            <a href="#vendedores" className="navbar-link">Vendedores</a>
          </li>
          <li className="navbar-item">
            <a href="#reportes" className="navbar-link">Reportes</a>
          </li>
          <li className="navbar-item">
            <a href="#contacto" className="navbar-link">Contacto</a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* User Actions */}
        <div className="navbar-actions">
          <button className="btn-login">Iniciar Sesión</button>
          <button className="btn-signup">Registrarse</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
