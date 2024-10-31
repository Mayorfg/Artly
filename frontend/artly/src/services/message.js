// src/services/message.js
import api from './api';

export const sendMessage = (receiver_id, content) =>
  api.post('/messages', { receiver_id, content }, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });

export const getMessages = (user_id) =>
  api.get(`/messages/${user_id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });