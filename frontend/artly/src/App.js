// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate,  UNSAFE_DataRouterStateContext } from 'react-router-dom';
import ArtworkFeed from './pages/ArtworkFeed';
import Register from './pages/Register';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import FollowingUsersPage from './pages/FollowingUsersPage';
import FollowingPage from './pages/FollowingPage';
import ExplorePage from './pages/ExplorePage';
import NavBar from './components/NavBar';
import HomeNavBar from './components/HomeNavBar'
import MessagingPage from './pages/MessagingPage';
import SavedArtworksPage from './pages/SavedArtworksPage';
import PostArtwork from './pages/PostArtwork';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeNavBar />} />
        <Route path="/login" element={<HomeNavBar />} />
        <Route path="/register" element={<HomeNavBar />} />
        <Route path="/artworks" element={<ProtectedRoute element={<NavBar />} />} />
        <Route path="/profile/:user_id" element={<ProtectedRoute element={<NavBar />} />} />
        <Route path="/following" element={<ProtectedRoute element={<NavBar />} />} />
        <Route path="/explore" element={<ProtectedRoute element={<NavBar />} />} />
        <Route path="/messages/:user_id" element={<ProtectedRoute element={<NavBar />} />} />
        <Route path="/saved-artworks" element={<ProtectedRoute element={<NavBar />} />} />
        <Route path="/followingusers" element={<ProtectedRoute element={<NavBar />} />} />
        <Route path="/post-artwork" element={<ProtectedRoute element={<NavBar />} />} />
      </Routes>


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/artworks" element={<ProtectedRoute element={<ArtworkFeed />} />} />
        <Route path="/profile/:user_id" element={<ProtectedRoute element={<UserProfile />} />} />
        <Route path="/following" element={<ProtectedRoute element={<FollowingPage />} />} />
        <Route path="/explore" element={<ProtectedRoute element={<ExplorePage />} />} />
        <Route path="/messages/:user_id" element={<ProtectedRoute element={<MessagingPage />} />} />
        <Route path="/saved-artworks" element={<ProtectedRoute element={<SavedArtworksPage />} />} />
        <Route path="/followingusers" element={<ProtectedRoute element={<FollowingUsersPage />} />} />
        <Route path="/post-artwork" element={<ProtectedRoute element={<PostArtwork />} />} />
        {/* Redirect any unknown routes to /explore or a 404 page */}
        <Route path="*" element={<Navigate to="/" replace />} />
        {/* ...other routes */}
      </Routes>
    </Router>
  );
}

export default App;