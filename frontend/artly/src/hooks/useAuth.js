// src/hooks/useAuth.js

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

function useAuth() {
  //const  [isAuthenticated, setIsAuthenticated ] = useState(false);

  //useEffect(() => {
    //const token = localStorage.getItem('token');
    //setIsAuthenticated(!!token);
  //}, []);

  //return { isAuthenticated, setIsAuthenticated };
  return useContext(AuthContext);
}

export default useAuth;