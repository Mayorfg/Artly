// src/components/NavBar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png'; // Logo image
import profileIcon from '../assets/profile-icon.png'; // Default profile icon
import './NavBar.css';

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
            <Link to="/register" className="nav-button">Sign Up</Link>
            <Link to="/login" className="nav-button">Login</Link>
      </div>
    </nav>
  );
};

export default NavBar;