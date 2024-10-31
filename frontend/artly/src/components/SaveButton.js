// src/components/SaveButton.js
import React, { useState } from 'react';
import { saveArtwork } from '../services/savedArtwork';

const SaveButton = ({ artworkId }) => {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    saveArtwork(artworkId)
      .then(() => setSaved(true))
      .catch(error => console.error(error));
  };

  return (
    <button onClick={handleSave} disabled={saved}>
      {saved ? 'Saved' : 'Save'}
    </button>
  );
};

export default SaveButton;