import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch all subcategories
export const fetchSubCategories = createAsyncThunk('subCategories/fetchSubCategories', async () => {
  const response = await axios.get('/api/subcategories');
  return response.data.data.subCategories;
});

// Create a new subcategory
export const createSubCategory = createAsyncThunk('subCategories/createSubCategory', async (formData) => {
  const response = await axios.post('/api/subcategories', formData);
  return response.data.data.subCategory;
});

// Update a subcategory
export const updateSubCategory = createAsyncThunk('subCategories/updateSubCategory', async ({ id, updatedSubCategory }) => {
  const response = await axios.patch(`/api/subcategories/${id}`, updatedSubCategory);
  return response.data.data.subCategory;
});

// Delete a subcategory
export const deleteSubCategory = createAsyncThunk('subCategories/deleteSubCategory', async (id) => {
  await axios.delete(`/api/subcategories/${id}`);
  return id;
});

const subCategorySlice = createSlice({
  name: 'subCategories',
  initialState: {
    subCategories: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.subCategories = action.payload;
      })
      .addCase(fetchSubCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createSubCategory.fulfilled, (state, action) => {
        state.subCategories.push(action.payload);
      })
      .addCase(updateSubCategory.fulfilled, (state, action) => {
        const index = state.subCategories.findIndex((subCategory) => subCategory._id === action.payload._id);
        state.subCategories[index] = action.payload;
      })
      .addCase(deleteSubCategory.fulfilled, (state, action) => {
        state.subCategories = state.subCategories.filter((subCategory) => subCategory._id !== action.payload);
      });
  },
});

export const selectAllSubCategories = (state) => state.subCategories.subCategories;

export default subCategorySlice.reducer;
