// src/components/ProtectedRoute.js

import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import useAuth from '../hooks/useAuth';

function ProtectedRoute({ element }) {
  //const {isAuthenticated} = useAuth();
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated || !isAuthenticated.token) {
    return <Navigate to="/login" replace />;
  }

  return element;

  // return isAuthenticated ? element : <Navigate to="/login" />;
}

export default ProtectedRoute;