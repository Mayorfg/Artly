// src/services/follow.js
import api from './api';

export const followUser = (following_id) => api.post('/follows/follow', { following_id }, {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

export const unfollowUser = (following_id) => api.post('/follows/unfollow', { following_id }, {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

export const getFollowing = () => api.get('/follows/following', {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

export const getFollowers = () => api.get('/follows/followers', {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});