import { createSlice } from '@reduxjs/toolkit';
import createBooking from '../actions/createBooking';

const initialState = {
  bookings: [],
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {},
  extraReducers: {
    [createBooking.pending]: (state) => {
      state.loading = true;
    },
    [createBooking.fulfilled]: (state, action) => {
      state.loading = false;
      // state.bookings = action.payload;
    },
    [createBooking.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default bookingSlice.reducer;
