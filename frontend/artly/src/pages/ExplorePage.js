// src/pages/ExplorePage.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ArtworkPost from '../components/ArtworkPost';

const ExplorePage = () => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    api.get('/artworks')
      .then(response => setArtworks(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      {artworks.map(artwork => (
        <ArtworkPost key={artwork.post_id} artwork={artwork} />
      ))}
    </div>
  );
};

export default ExplorePage;