// src/pages/PostArtwork.js
import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const PostArtwork = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    tags: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/artworks', formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(() => navigate.push('/artworks'))
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Post New Artwork</h2>
      <input name="title" placeholder="Title" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} />
      <input name="image_url" placeholder="Image URL" onChange={handleChange} required />
      <input name="tags" placeholder="Tags (comma-separated)" onChange={handleChange} />
      <button type="submit">Post Artwork</button>
    </form>
  );
};

export default PostArtwork;