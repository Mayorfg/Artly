// src/services/savedArtwork.js
import api from './api';

export const saveArtwork = (artwork_id) =>
  api.post('/saved-artworks', { artwork_id }, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });

export const getSavedArtworks = () =>
  api.get('/saved-artworks', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });