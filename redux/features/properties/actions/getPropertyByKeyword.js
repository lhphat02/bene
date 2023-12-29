import { createAsyncThunk } from '@reduxjs/toolkit';

import { CONSTANTS } from '../../../../constants/Constants';

const getPropertyByKeyword = createAsyncThunk(
  'property/getPropertyByKeyword',
  async (keyword, { rejectWithValue }) => {
    try {
      // Make the API call
      const response = await CONSTANTS.FUNCTIONS.AXIOS.GET(
        `${CONSTANTS.ENDPOINTS.PROPERTY.GET_BY_KEYWORD}?keyword=${keyword}`
      );

      // Get the JSON response body
      const responseData = response.data;

      // Log the response
      console.log('\x1b[33m RESPONSE: \x1b[0m', responseData);

      // If the response contains an error code, reject the thunk with the error message
      if (!responseData.statusCode) {
        console.log('\x1b[33m GET PROPERTY BY KEYWORD FAILED \x1b[0m');
        return rejectWithValue(responseData);
      }

      console.log('\x1b[32m GET PROPERTY BY KEYWORD SUCCESS! \x1b[0m');

      // Return the response data
      return responseData;
    } catch (error) {
      // Log the error
      console.log('\x1b[31m GET PROPERTY BY KEYWORD ERROR: \x1b[0m', error);
      return rejectWithValue('Error getting property by keyword');
    }
  }
);

export default getPropertyByKeyword;
