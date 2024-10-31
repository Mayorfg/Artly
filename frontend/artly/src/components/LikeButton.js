// src/components/LikeButton.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';

const LikeButton = ({ postId }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Optionally, check if the user has already liked the post
  }, []);

  const handleLike = () => {
    api.post('/interactions', {
      post_id: postId,
      interaction_type: 'like',
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(() => setLiked(true))
      .catch(error => console.error(error));
  };

  return (
    <button onClick={handleLike} disabled={liked}>
      {liked ? 'Liked' : 'Like'}
    </button>
  );
};

export default LikeButton;