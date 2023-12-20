import { createSlice } from '@reduxjs/toolkit';
// import login from '../actions/login';

const initialState = {
  user: null,
  token: null,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.username;
      state.token = action.payload.token;
    },
    loginFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.loading = false;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(login.pending, (state) => {
  //       state.loading = true;
  //     })
  //     .addCase(login.fulfilled, (state, action) => {
  //       state.user = action.payload.user;
  //       state.token = action.payload.token;
  //       state.error = null;
  //       state.loading = false;
  //     })
  //     .addCase(login.rejected, (state, action) => {
  //       state.user = null;
  //       state.token = null;
  //       state.error = action.payload;
  //       state.loading = false;
  //     });
  // },
});

export const { login, logout, loginSuccess, loginFailed } = authSlice.actions;

export default authSlice.reducer;
