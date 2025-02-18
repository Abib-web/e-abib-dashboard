import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
import productReducer from './productSlice';
import orderReducer from './orderSlice';
import deliveryReducer from './deliverySlice';
import settingsReducer from './settingsSlice';
import brandsReducer from './brandSlice';
import categoriesReducer from './categorySlice';
import subCategoryReducer from './subCategorySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    products: productReducer,
    orders: orderReducer,
    deliveries: deliveryReducer,
    settings: settingsReducer,
    brands: brandsReducer,
    categories: categoriesReducer,
    subCategories: subCategoryReducer,
  },
});

export default store;
