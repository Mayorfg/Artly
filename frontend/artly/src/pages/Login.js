// src/pages/Login.js
import React, { useCallback, useContext, useState } from 'react';
import api from '../services/api';
import { login } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Register.css';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  //const { setIsAuthenticated } = useAuth();
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // Similar handleChange and handleSubmit functions
  // On successful login, store the JWT token in localStorage

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setIsAuthenticated({ token: response.data.token, user: response.data.user });

      alert(response.data.message)
      
      // Redirect to the desired page
      navigate('/artworks');
    } catch (error) {
      if (error.response) {
        console.error('Error data:', error.response.data); // Better error logging
        alert(error.response.data.error); // Show specific error message if available
      } else {
        console.error('Error', error.message); // Generic error logging
        alert('An unexpected error occurred. Please try again.');
      }
    }

  };

  return (
    <form onSubmit={handleSubmit} className='login-form'>
      {/* Input fields for email and password */}
      <h2>Login</h2>
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <a href='#..' >Forgot password? </a>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;