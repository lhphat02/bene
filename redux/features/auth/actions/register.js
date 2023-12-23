import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const register = createAsyncThunk(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      console.log('\x1b[33m REGISTER WITH DATA: \x1b[0m', data);

      // Make the API call
      const response = await axios.post(
        'http://192.168.1.10:5050/users/createUser',
        {
          username: data.username,
          email: data.email,
          phoneNumber: data.phoneNumber,
          displayName: data.accountName,
          password: data.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Get the JSON response body
      const responseData = response.data;

      // Log the response
      console.log('\x1b[33m RESPONSE: \x1b[0m', responseData);

      // If the response contains an error code, reject the thunk with the error message
      if (!responseData.resultCode) {
        console.log('\x1b[33m REGISTER FAILED \x1b[0m');
        return rejectWithValue(responseData);
      }

      console.log('\x1b[33m REGISTER SUCCESS! \x1b[0m');

      // Return the response data
      return responseData;
    } catch (error) {
      // Log the error
      console.error('\x1b[33m REGISTER ERROR: \x1b[0m', error);
      return rejectWithValue(error.message || 'An error occurred');
    }
  }
);

export default register;
