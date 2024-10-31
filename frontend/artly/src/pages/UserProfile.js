// src/pages/UserProfile.js
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import ArtworkPost from '../components/ArtworkPost';
import FollowButton from '../components/FollowButton';
import defaultProfileIcon from '../assets/profile-icon.png';
import { jwtDecode } from 'jwt-decode';
import './UserProfile.css'; // Include CSS for styling

const UserProfile = () => {
  const { user_id } = useParams();
  const { isAuthenticated } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState({});
  const [artworks, setArtworks] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    // Fetch user profile data
    api.get(`/users/profile/${user_id}`)
      .then(response => setUserProfile(response.data))
      .catch(error => console.error(error));

    // Fetch artworks by the user
    api.get('/artworks', { params: { currentUserId } })
      .then(response => setArtworks(response.data))
      .catch(error => console.error(error));

    // Decode the JWT token to get the current user's ID
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      console.log(decoded);
      setCurrentUserId(isAuthenticated.user.user_id );
    }
  }, [user_id]);

  // Handle file selection for profile image upload
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle profile picture update
  const handleUpdateProfilePicture = () => {
    const formData = new FormData();
    formData.append('profile_image', selectedFile);

    api.put('/users/profile-picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        setUserProfile({ ...userProfile, profile_picture_url: response.data.profile_picture_url });
        setSelectedFile(null);
      })
      .catch(error => console.error(error));
  };

  const isOwnProfile = isAuthenticated.user && isAuthenticated.user.user_id === parseInt(user_id, 10)

  return (
    <div className="user-profile">
      <h2>{userProfile.name}</h2>
      <img
        src={userProfile.profile_picture_url || defaultProfileIcon}
        alt="Profile"
        className="profile-picture"
      />

      {currentUserId === parseInt(userProfile.user_id) ? (
        // If the current user is viewing their own profile
        <div className="profile-image-upload">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <button onClick={handleUpdateProfilePicture} disabled={!selectedFile}>
            Update Profile Picture
          </button>
        </div>
      ) : (
        // If viewing another user's profile, show the Follow button
        <FollowButton userId={user_id} />
      )}

      {userProfile.role === 'artist' ? (
        <div>
          <h3>Artworks by {userProfile.name}</h3>
          {artworks.map(artwork => (
            <ArtworkPost key={artwork.post_id} artwork={artwork} />
          ))}
        </div>
      ) : (
        <p>{userProfile.name} is a user.</p>
      )}
      {/* Additional profile details can be added here */}
    </div>
  );
};

export default UserProfile;