// src/pages/ArtworkFeed.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ArtworkPost from '../components/ArtworkPost';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ArtworkFeed = () => {
  const [artworks, setArtworks] = useState([]);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    api.get('/artworks')
      .then(response => setArtworks(response.data))
      .catch(error => console.error(error));

    // Get user role from token
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUserRole(decoded.role);
    }
  }, []);

  return (
    <div>
      {userRole === 'artist' && (
        <Link to="/post-artwork">
          <button>Post New Artwork</button>
        </Link>
      )}
      {artworks.map(artwork => (
        <ArtworkPost key={artwork.post_id} artwork={artwork} />
      ))}
    </div>
  );
};

export default ArtworkFeed;