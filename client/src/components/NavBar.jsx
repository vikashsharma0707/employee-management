



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const NavBar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">EMS</div>
      <button className="navbar-toggle" onClick={toggleMenu}>
        {isMenuOpen ? '✖' : '☰'}
      </button>
      <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
        {user ? (
          <>
            <span className="navbar-user">Welcome, {user.name} ({user.role})</span>
            {user.role === 'admin' && (
              <button className="navbar-btn" onClick={() => navigate('/admin')}>
                Admin Dashboard
              </button>
            )}
            {user.role === 'hr' && (
              <button className="navbar-btn" onClick={() => navigate('/hr')}>
                HR Dashboard
              </button>
            )}
            {user.role === 'employee' && (
              <button className="navbar-btn" onClick={() => navigate('/employee')}>
                Employee Dashboard
              </button>
            )}
            <button className="navbar-btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="navbar-btn" onClick={() => navigate('/')}>
              Login
            </button>
            <button className="navbar-btn" onClick={() => navigate('/register')}>
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;