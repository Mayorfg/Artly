// src/components/NavBar.js
import React, { useContext } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/logo.png'; // Logo image
import profileIcon from '../assets/profile-icon.png'; // Default profile icon
import './NavBar.css';

const NavBar = () => {
  const location = useLocation();
  const path = location.pathname;
  const {isAuthenticated} = useContext(AuthContext);
  const user = isAuthenticated.user.name;

  // Determine if user is on the profile page
  const isProfilePage = path.startsWith('/profile');

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      </div>
      <div className="navbar-center">
        {isProfilePage ? (
          <>
            <Link to="/followers" className="nav-button">Followers</Link>
            <Link to="/following" className="nav-button">Following</Link>
            <Link to="/saved-artworks" className="nav-button">Saved Artworks</Link>
          </>
        ) : (
          <>
            <Link to="/following-artworks" className="nav-button">For You</Link>
            <Link to="/explore" className="nav-button">Explore</Link>
            <Link to="/messages" className="nav-button">Chat</Link>
          </>
        )}
      </div>
      <div className="navbar-right">
        {isProfilePage ? (
          <>
            <Link to="/following-artworks" className="nav-button">Home</Link>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link to={`/profile/${user}`}>
              <img
                src={profileIcon}
                alt="Profile"
                className="profile-icon"
              />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;