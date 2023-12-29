import { createSlice } from '@reduxjs/toolkit';
import getAllProperties from '../actions/getAllProperties';
import getPropertyByKeyword from '../actions/getPropertyByKeyword';

const initialState = {
  properties: [],
  loading: false,
  error: null,
};

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProperties.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProperties.fulfilled, (state, action) => {
        state.properties = action.payload.data;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getPropertyByKeyword.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPropertyByKeyword.fulfilled, (state, action) => {
        state.properties = action.payload.data;
        state.loading = false;
        state.error = null;
      })
      .addCase(getPropertyByKeyword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default propertySlice.reducer;
