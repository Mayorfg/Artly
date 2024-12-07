// src/components/ArtworkPost.js
import React from 'react';
import LikeButton from './LikeButton';
import { useHistory } from 'react-router-dom';

const ArtworkPost = ({ artwork }) => {
  const history = useHistory();

  // Convert binary data to a base64 image URL
  const imageSrc = artwork.image_data
    ? `data:image/png;base64,${artwork.image_data}`
    : null; // Add a fallback if needed

  const handlePurchase = () => {
    // Get the purchase token
    api.get(`/purchase/token/${artwork.post_id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => {
        const token = response.data.token;
        window.location.href = `https://ecommerce-app.com/purchase?token=${token}`;
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="artwork-post">
      <img src={artwork.image_data} alt={artwork.title} />
      <h3>{artwork.title}</h3>
      <p>{artwork.description}</p>
      <p>By: {artwork.User.name}</p>
      <LikeButton postId={artwork.post_id} />
      {/* Add Comment and Share components */}
      <button onClick={handlePurchase}>Purchase</button>
    </div>
  );
};

export default ArtworkPost;