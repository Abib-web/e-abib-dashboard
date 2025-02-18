import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await axios.get('http://localhost:3000/api/orders');
  return response.data.data.orders;
});

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectAllOrders = (state) => state.orders.orders;
export default orderSlice.reducer;
