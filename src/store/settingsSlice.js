import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  settings: [],
  loading: false,
  error: null,
};

export const fetchSettings = createAsyncThunk('settings/fetchSettings', async () => {
  const response = await axios.get('http://localhost:3000/api/settings');
  return response.data.data.settings;
});

export const updateSetting = createAsyncThunk('settings/updateSetting', async ({ id, value }) => {
  const response = await axios.patch(`http://localhost:3000/api/settings/${id}`, { value });
  return response.data.data.setting;
});

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateSetting.fulfilled, (state, action) => {
        const index = state.settings.findIndex(setting => setting.id === action.payload.id);
        if (index !== -1) {
          state.settings[index] = action.payload;
        }
      });
  },
});

export const selectAllSettings = (state) => state.settings.settings;
export default settingsSlice.reducer;
