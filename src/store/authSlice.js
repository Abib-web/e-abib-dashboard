import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const verifyToken = createAsyncThunk('auth/verifyToken', async (_, thunkAPI) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    try {
      const response = await axios.get('http://localhost:3000/api/auth/verifyToken', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data.data.user;
    } catch (error) {
      localStorage.removeItem('accessToken'); // Supprimer le token invalide
      return thunkAPI.rejectWithValue(error.response.data);
    }
  } else {
    return thunkAPI.rejectWithValue({ message: 'No token found' });
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('accessToken') || null,
    isAuthenticated: false,
    loading: false,
    error: null
  },
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('accessToken', action.payload.token);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('accessToken');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  }
});

export const { login, logout } = authSlice.actions;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthToken = (state) => state.auth.token;
export const selectLoading = (state) => state.auth.loading;

export default authSlice.reducer;
