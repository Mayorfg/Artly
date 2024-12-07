// src/components/NavBar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png'; // Logo image
import profileIcon from '../assets/profile-icon.png'; // Default profile icon
import './HomeNavBar.css';

const NavBar = () => {
  const location = useLocation();
  const path = location.pathname;

  // Determine if user is on the profile page
  const isProfilePage = path.startsWith('/profile');
  const isLoginPage = path.startsWith('/login');
  const isRegisterPage = path.startsWith('/register');
  const isHomePage = path === '/';

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      </div>
      <div className="navbar-right">        
            <Link to="/register" className="nav-button"> <i className="bi bi-person"></i> Sign Up</Link>
            <Link to="/login" className="nav-button"> <i className="bi bi-box-arrow-in-right"></i> Login</Link>
      </div>
    </nav>
  );
};

export default NavBar;