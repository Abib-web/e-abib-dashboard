import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectCurrentUser, selectLoading } from '../../store/authSlice';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const ProtectedRoute = ({ children, adminOnly }) => {
  const user = useSelector(selectCurrentUser);
  const loading = useSelector(selectLoading);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
