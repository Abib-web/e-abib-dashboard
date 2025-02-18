import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { verifyToken } from './store/authSlice';

import UserList from './components/Users/UserList';
import ProductList from './components/Products/ProductList';
import OrderList from './components/Orders/OrderList';
import DeliveryList from './components/Deliveries/DeliveryList';
import SiteSettings from './components/Settings/SiteSettings';
import Login from './components/Auth/Login';
import Profile from './components/Profile/Profile';
import BrandList from './components/Brand/BrandList';
import CategoryList from './components/Category/CategoryList';
import SlideList from './components/Slide/SlideList';
import Root from './components/Root/Root';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import MainContent from './components/MainContent/MainContent';
import './App.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<ProtectedRoute><MainContent /></ProtectedRoute>} />
      <Route path="users" element={<ProtectedRoute adminOnly={true}><UserList /></ProtectedRoute>} />
      <Route path="products" element={<ProtectedRoute adminOnly={true}><ProductList /></ProtectedRoute>} />
      <Route path="orders" element={<ProtectedRoute adminOnly={true}><OrderList /></ProtectedRoute>} />
      <Route path="deliveries" element={<ProtectedRoute adminOnly={true}><DeliveryList /></ProtectedRoute>} />
      <Route path="settings" element={<ProtectedRoute adminOnly={true}><SiteSettings /></ProtectedRoute>} />
      <Route path="profile" element={<ProtectedRoute adminOnly={true}><Profile /></ProtectedRoute>} />
      <Route path="categories" element={<ProtectedRoute adminOnly={true}><CategoryList /></ProtectedRoute>} />
      <Route path="brands" element={<ProtectedRoute adminOnly={true}><BrandList /></ProtectedRoute>} />
      <Route path="slides" element={<ProtectedRoute adminOnly={true}><SlideList /></ProtectedRoute>} />
    </Route>
  )
);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

export default App;
