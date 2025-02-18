import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBrands = createAsyncThunk('brands/fetchBrands', async () => {
  const response = await axios.get('http://localhost:3000/api/brands');
  return response.data.data.brands;
});

export const createBrand = createAsyncThunk('brands/createBrand', async (newBrand) => {
  const token = localStorage.getItem('accessToken');

  const response = await axios.post('http://localhost:3000/api/brands', newBrand, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data.data.brand;
});

export const updateBrand = createAsyncThunk('brands/updateBrand', async ({ id, updatedBrand }) => {
  const token = localStorage.getItem('accessToken');

  const response = await axios.patch(`http://localhost:3000/api/brands/${id}`, updatedBrand, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data.data.brand;
});

export const deleteBrand = createAsyncThunk('brands/deleteBrand', async (id) => {
  const token = localStorage.getItem('accessToken');
  await axios.delete(`http://localhost:3000/api/brands/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return id;
});

const brandsSlice = createSlice({
  name: 'brands',
  initialState: {
    brands: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.brands.push(action.payload);
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        const index = state.brands.findIndex(brand => brand._id === action.payload._id);
        state.brands[index] = action.payload;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.brands = state.brands.filter(brand => brand._id !== action.payload);
      });
  }
});

export const selectAllBrands = (state) => state.brands.brands;

export default brandsSlice.reducer;
