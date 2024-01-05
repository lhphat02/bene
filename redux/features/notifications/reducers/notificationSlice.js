import { createSlice } from '@reduxjs/toolkit';
import getUserNotification from '../actions/getUserNotification';
import updateNotiStatus from '../actions/updateNotiStatus';

const initialState = {
  notifications: [],
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserNotification.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload.data;
      })
      .addCase(getUserNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateNotiStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateNotiStatus.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateNotiStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default notificationSlice.reducer;
