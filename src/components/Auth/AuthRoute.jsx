import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectIsAuthenticated } from '../../store/authSlice';  // Chemin corrigé

const AuthRoute = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthRoute;
