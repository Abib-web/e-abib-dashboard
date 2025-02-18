import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyToken, selectLoading, selectIsAuthenticated } from '../../store/authSlice';
import { Outlet } from 'react-router-dom';
import Header from '../Layout/Header';
import Sidebar from '../Layout/Sidebar';
import Footer from '../Layout/Footer';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Login from '../Auth/Login';

const Root = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Header />
      <Sidebar />
      <div className="main-content">
        {isAuthenticated ? <Outlet /> : <Login />}
      </div>
      <Footer />
    </>
  );
};

export default Root;
