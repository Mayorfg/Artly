// src/pages/PostArtwork.js
import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import './PostArtwork.css';
import { Container } from 'react-bootstrap';

const PostArtwork = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_data: '',
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
    <Container className='post-artwork-container'> 
    <form onSubmit={handleSubmit} className='post-artwork-form'>
      <h2>Post New Artwork</h2>
      <input type='file' accept='image/*' name="image_data" onChange={handleChange} required />
      <input name="title" placeholder="Title" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} />
      <input name="tags" placeholder="Tags (comma-separated)" onChange={handleChange} />
      <button type="submit">Post</button>
    </form>
    </Container>
  );
};

export default PostArtwork;