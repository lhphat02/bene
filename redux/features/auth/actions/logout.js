import { createAsyncThunk } from '@reduxjs/toolkit';
import { removeLocalData } from '../../../../utils/helper/user';

const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // Remove the user_id from AsyncStorage
      await removeLocalData('userId');

      // Remove the token from AsyncStorage
      await removeLocalData('token');

      console.log('\x1b[33m LOGOUT SUCCESS! \x1b[0m');

      // Return the response data
      return;
    } catch (error) {
      // Log the error
      console.error('\x1b[33m LOGOUT ERROR: \x1b[0m', error);
      return rejectWithValue(error.message || 'An error occurred');
    }
  }
);

export default logout;
