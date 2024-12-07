// src/pages/ArtworkFeed.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ArtworkPost from '../components/ArtworkPost';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './ArtworkFeed.css';

const ArtworkFeed = () => {
  const [artworks, setArtworks] = useState([]);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    api.get('/artworks')
      .then(response => {
        const artwork_data = response.data;
        if (typeof artwork_data.image_data === 'string' && !artwork_data.image_data.startsWith('data:image')) {
          // Convert binary data to base64 and prepend the data URI
          artwork_data.image_data = `data:image/png;base64,${artwork_data.image_data}`;
        }
        setArtworks(artwork_data)
      })
      .catch(error => console.error(error));

    // Get user role from token
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUserRole(decoded.role);
    }
  }, []);

  return (
    <div className='artwork-feed-container'>
      {userRole === 'artist' && (
        <Link to="/post-artwork">
          <button><i className="bi bi-plus-square"></i> Post</button>
        </Link>
      )}
      {artworks.map(artwork => (
        <ArtworkPost key={artwork.post_id} artwork={artwork}/>
      ))}
    </div>
  );
};

export default ArtworkFeed;