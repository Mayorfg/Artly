// src/pages/SavedArtworksPage.js
import React, { useEffect, useState } from 'react';
import { getSavedArtworks } from '../services/savedArtwork';
import ArtworkPost from '../components/ArtworkPost';

const SavedArtworksPage = () => {
  const [savedArtworks, setSavedArtworks] = useState([]);

  useEffect(() => {
    getSavedArtworks()
      .then(response => setSavedArtworks(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Your Saved Artworks</h2>
      {savedArtworks.map(artwork => (
        <ArtworkPost key={artwork.post_id} artwork={artwork} />
      ))}
    </div>
  );
};

export default SavedArtworksPage;