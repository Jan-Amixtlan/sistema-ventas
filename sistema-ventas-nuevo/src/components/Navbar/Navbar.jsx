import { useState, useEffect } from 'react';
import LoginModal from '../LoginModal/LoginModal.jsx';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    closeMenu(); // Close mobile menu if open
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  // Close menu when clicking outside or pressing Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMenuOpen && <div className="navbar-overlay" onClick={closeMenu}></div>}
      
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
            <a href="#home" className="navbar-link" onClick={closeMenu}>Inicio</a>
          </li>
          <li className="navbar-item">
            <a href="#dashboard" className="navbar-link" onClick={closeMenu}>Dashboard</a>
          </li>
          <li className="navbar-item">
            <a href="#vendedores" className="navbar-link" onClick={closeMenu}>Vendedores</a>
          </li>
          <li className="navbar-item">
            <a href="#reportes" className="navbar-link" onClick={closeMenu}>Reportes</a>
          </li>
          <li className="navbar-item">
            <a href="#contacto" className="navbar-link" onClick={closeMenu}>Contacto</a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* User Actions */}
        <div className="navbar-actions">
          <button 
            className="btn-login"
            onClick={openLoginModal}
          >
            Iniciar Sesión
          </button>
          <button className="btn-signup">Registrarse</button>
        </div>
        </div>
      </nav>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={closeLoginModal} 
      />
    </>
  );
};

export default Navbar;