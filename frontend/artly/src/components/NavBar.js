// src/components/NavBar.js
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { jwtDecode } from 'jwt-decode';
import logo from '../assets/logo.png'; // Logo image
import profileIcon from '../assets/profile-icon.png'; // Default profile icon
import './NavBar.css';

const NavBar = () => {
  const location = useLocation();
  const path = location.pathname;
  const { isAuthenticated } = useContext(AuthContext);
  const user = isAuthenticated.user.name;
  const [userProfile, setUserProfile] = useState({});
  const [currentUserId, setCurrentUserId] = useState(null);

  // Determine if user is on the profile page
  const isProfilePage = path.startsWith('/profile');

  useEffect(() => {
    // Fetch user profile data
    api.get(`/users/profile/${user}`)
      .then(response => {
        const userData = response.data;

        if (typeof userData.profile_picture_data === 'string' && !userData.profile_picture_data.startsWith('data:image')) {
          // Convert binary data to base64 and prepend the data URI
          userData.profile_picture_data = `data:image/png;base64,${userData.profile_picture_data}`;
        }
        setUserProfile(userData);
        //console.log(userProfile)
        //console.log(response.data);
      })
      .catch(error => console.error(error));

    // Decode the JWT token to get the current user's ID
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      //console.log(decoded);
      setCurrentUserId(isAuthenticated.user.user_id);
    }
  }, [user]);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/followimg-artworks">
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
            <Link to="/artworks" className="nav-button">For You</Link>
            <Link to="/explore" className="nav-button">Explore</Link>
            <Link to="/messages" className="nav-button">Chat</Link>
          </>
        )}
      </div>
      <div className="navbar-right">
        {isProfilePage ? (
          <>
            <Link to="/artworks" className="nav-button">Home</Link>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link to={`/profile/${user}`}>
              <img
                src={userProfile.profile_picture_data ? userProfile.profile_picture_data : profileIcon}
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