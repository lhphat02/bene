import { createSlice } from '@reduxjs/toolkit';
import getAllProperties from '../actions/getAllProperties';
import getPropertyByKeyword from '../actions/getPropertyByKeyword';
import createProperty from '../actions/createProperty';

const initialState = {
  properties: [],
  searchResult: [],
  loading: false,
  error: null,
};

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Get all properties
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

      // Get property by keyword
      .addCase(getPropertyByKeyword.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPropertyByKeyword.fulfilled, (state, action) => {
        state.searchResult = action.payload.data;
        state.loading = false;
        state.error = null;
      })
      .addCase(getPropertyByKeyword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // Create property
      .addCase(createProperty.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProperty.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default propertySlice.reducer;
