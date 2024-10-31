// src/components/FollowButton.js
import React, { useState, useEffect } from 'react';
import { followUser, unfollowUser } from '../services/follow';
import api from '../services/api';

const FollowButton = ({ userId }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    // Check if the current user is following userId
    api.get(`/users/profile/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => {
        const user = response.data;
        // Assuming you have a way to get the list of users the current user is following
        // For simplicity, let's say the user object contains an isFollowing field
        setIsFollowing(user.isFollowing);
      })
      .catch(error => console.error(error));
  }, [userId]);

  const handleFollow = () => {
    followUser(userId)
      .then(() => setIsFollowing(true))
      .catch(error => console.error(error));
  };

  const handleUnfollow = () => {
    unfollowUser(userId)
      .then(() => setIsFollowing(false))
      .catch(error => console.error(error));
  };

  return (
    <>
      {isFollowing ? (
        <button onClick={handleUnfollow}>Unfollow</button>
      ) : (
        <button onClick={handleFollow}>Follow</button>
      )}
    </>
  );
};

export default FollowButton;