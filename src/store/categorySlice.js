import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await axios.get('http://localhost:3000/api/categories');
  return response.data.data.categories;
});

export const createCategory = createAsyncThunk('categories/createCategory', async (newCategory) => {
  const token = localStorage.getItem('accessToken');

  const response = await axios.post('http://localhost:3000/api/categories', newCategory, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data.data.category;
});

export const updateCategory = createAsyncThunk('categories/updateCategory', async ({ id, updatedCategory }) => {
  const token = localStorage.getItem('accessToken');
  const response = await axios.patch(`http://localhost:3000/api/categories/${id}`, updatedCategory, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data.data.category;
});

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (id) => {
  const token = localStorage.getItem('accessToken');
  await axios.delete(`http://localhost:3000/api/categories/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return id;
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(category => category._id === action.payload._id);
        state.categories[index] = action.payload;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(category => category._id !== action.payload);
      });
  }
});

export const selectAllCategories = (state) => state.categories.categories;

export default categoriesSlice.reducer;
