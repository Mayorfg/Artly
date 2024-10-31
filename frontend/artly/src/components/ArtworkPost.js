// src/components/ArtworkPost.js
import React from 'react';
import LikeButton from './LikeButton';
import SaveButton from './SaveButton';
import { Link } from 'react-router-dom';
import defaultProfileIcon from '../assets/profile-icon.png';

const ArtworkPost = ({ artwork }) => {
  const artistProfilePicture = artwork.User.profile_picture_url || defaultProfileIcon;

  const handlePurchase = () => {
    // Implement the purchase logic here
    // For example, redirect to purchase page or show a modal
    console.log('Purchase button clicked');
  };

  return (
    <div className="artwork-post">
      <div className="artwork-header">
        <img
          src={artistProfilePicture}
          alt={artwork.User.name}
          className="artist-profile-icon"
        />
        <Link to={`/profile/${artwork.User.user_id}`}>
          <p>{artwork.User.name}</p>
        </Link>
      </div>
      <img src={artwork.image_url} alt={artwork.title} />
      <h3>{artwork.title}</h3>
      <p>{artwork.description}</p>
      <LikeButton postId={artwork.post_id} />
      <SaveButton artworkId={artwork.post_id} />
      <button onClick={handlePurchase}>Purchase</button>
    </div>
  );
};

export default ArtworkPost;