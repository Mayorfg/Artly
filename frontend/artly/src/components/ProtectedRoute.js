// src/components/ProtectedRoute.js

import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useParams, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import useAuth from '../hooks/useAuth';

function ProtectedRoute({ element }) {
  //const {isAuthenticated} = useAuth();
  const { isAuthenticated } = useContext(AuthContext);
  const { user_id } = useParams();
  const location = useLocation();
  const path = location.pathname;
  const isProfilePage = path.startsWith("/profile");

  if (!isAuthenticated || !isAuthenticated.token) {
    return <Navigate to="/login" replace />;
  }

  if ( isProfilePage && (!isAuthenticated || !isAuthenticated.token || (isAuthenticated.user.name !== user_id) ) ) {
    return <Navigate to="/login" replace />;
  }

  return element;

  // return isAuthenticated ? element : <Navigate to="/login" />;
}

export default ProtectedRoute;