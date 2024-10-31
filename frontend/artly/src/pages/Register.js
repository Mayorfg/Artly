// src/pages/Register.js
import React, { useContext, useState } from 'react';
import { register } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'user',
  });

  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(formData);
      //localStorage.setItem('token', response.data.token);
      //localStorage.setItem('user', JSON.stringify(response.data.user));
      //setIsAuthenticated({ token: response.data.token, user: response.data.user });

      alert('Registration successful!');
      // Redirect to login or home page
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.error);
      } else {
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input fields for name, email, password, role */}
      <h2>Register</h2>
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        name="name"
        type="text"
        placeholder="Username"
        value={formData.name}
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
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        required
      >
        <option value="">Select Role</option>
        <option value="artist">Artist</option>
        <option value="user">User</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;