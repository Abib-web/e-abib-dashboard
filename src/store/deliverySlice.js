import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  deliveries: [],
  loading: false,
  error: null,
};

export const fetchDeliveries = createAsyncThunk('deliveries/fetchDeliveries', async () => {
  const response = await axios.get('http://localhost:3000/api/deliveries');
  return response.data.data.deliveries;
});

const deliverySlice = createSlice({
  name: 'deliveries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeliveries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDeliveries.fulfilled, (state, action) => {
        state.loading = false;
        state.deliveries = action.payload;
      })
      .addCase(fetchDeliveries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectAllDeliveries = (state) => state.deliveries.deliveries;
export default deliverySlice.reducer;
