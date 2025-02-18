import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../../store/authSlice';

const RedirectIfAuthenticated = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RedirectIfAuthenticated;
