import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoginModal from '../LoginModal/LoginModal.jsx';
import logoImage from '../../assets/images/logo.png';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    closeMenu();
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  const goToAdmin = () => {
    navigate('/admin');
    setShowUserMenu(false);
    closeMenu();
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
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
          <img 
            src={logoImage} 
            alt="OSDEMS Digital" 
            className="logo-image"
          />
          {/* <div className="logo-content">
            <span className="logo-text">OSDEMSDigital</span>
            <span className="logo-subtitle">Sales Forecast</span>
          </div> */}
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
          {isAuthenticated() ? (
            <div className="user-menu-container">
              <button 
                className="user-button"
                onClick={toggleUserMenu}
              >
                <img 
                  src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'} 
                  alt={user?.name}
                  className="user-avatar"
                />
                <span className="user-name">{user?.name}</span>
                <svg className="dropdown-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </button>

              {showUserMenu && (
                <div className="user-dropdown">
                  <div className="dropdown-header">
                    <div className="user-info">
                      <strong>{user?.name}</strong>
                      <span className="user-role">{user?.role === 'admin' ? 'Administrador' : 'Usuario'}</span>
                    </div>
                  </div>
                  
                  <div className="dropdown-menu">
                    {isAdmin() && (
                      <button className="dropdown-item" onClick={goToAdmin}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="9" y1="9" x2="15" y2="9"></line>
                          <line x1="9" y1="15" x2="15" y2="15"></line>
                        </svg>
                        Panel Admin
                      </button>
                    )}
                    
                    <button className="dropdown-item" onClick={handleLogout}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16,17 21,12 16,7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button 
              className="btn-login"
              onClick={openLoginModal}
            >
              Iniciar Sesión
            </button>
          )}
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