import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getAuthToken = () => localStorage.getItem('accessToken');

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('http://localhost:3000/api/products');
  return response.data.data.products;
});

export const createProduct = createAsyncThunk('products/createProduct', async (newProduct) => {
  const token = getAuthToken();
  try {
    const response = await axios.post('http://localhost:3000/api/products', newProduct, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data.data.product;
  } catch (error) {
    console.error('Error creating product:', error.response?.data || error.message); // Log error
    throw error;
  }
});


export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, productData }) => {
  const token = getAuthToken();
  const response = await axios.patch(`http://localhost:3000/api/products/${id}`, productData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data.data.product;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
  const token = getAuthToken();
  await axios.delete(`http://localhost:3000/api/products/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return id;
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(product => product._id === action.payload._id);
        state.products[index] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(product => product._id !== action.payload);
      });
  }
});

export const selectAllProducts = (state) => state.products.products;

export default productsSlice.reducer;
