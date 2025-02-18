import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { selectAuthToken } from './authSlice'; // Importer le sélecteur pour le token

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { getState }) => {
  const state = getState();
  const token = selectAuthToken(state); // Utiliser le sélecteur pour obtenir le token
  if (!token) {
    throw new Error('No token found');
  }

  const response = await axios.get('http://localhost:3000/api/admin/users', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data.data.users;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (userId, { getState }) => {
  const state = getState();
  const token = selectAuthToken(state); // Utiliser le sélecteur pour obtenir le token
  if (!token) {
    throw new Error('No token found');
  }

  await axios.delete(`http://localhost:3000/api/admin/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return userId;
});

export const updateUser = createAsyncThunk('users/updateUser', async ({ id, userData }, { getState }) => {
  const state = getState();
  const token = selectAuthToken(state); // Utiliser le sélecteur pour obtenir le token
  if (!token) {
    throw new Error('No token found');
  }

  const response = await axios.patch(`http://localhost:3000/api/admin/users/${id}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data.data.user;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user._id !== action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user._id === action.payload._id);
        state.users[index] = action.payload;
      });
  }
});

export const selectAllUsers = (state) => state.users.users;
export const getUsersStatus = (state) => state.users.status;
export const getUsersError = (state) => state.users.error;

export default usersSlice.reducer;
