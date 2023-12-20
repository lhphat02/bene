import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const login = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      console.log('login');
      console.log('data', data);

      const response = await fetch('http://localhost:5050/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('response', response);

      const responseData = await response.json();

      console.log('responseData', responseData);

      if (!response.resultCode) {
        return rejectWithValue(responseData);
      }

      return responseData;
    } catch (error) {
      console.error('Error during fetch:', error);
      // Extract only the necessary information from the error
      return rejectWithValue(error.message || 'An error occurred');
    }
  }
);

export const loginStatic = (user) => (
  {
    type: 'auth/loginStatic',
    payload: user,
  },
  () => {
    console.log('loginStatic');
    console.log('user', user);
  }
);

export default login;
