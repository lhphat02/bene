import { createAsyncThunk } from '@reduxjs/toolkit';

import { CONSTANTS } from '../../../../constants/Constants';

const getPropertyByUserId = createAsyncThunk(
  'property/getPropertyByUserId',
  async (user_id, { rejectWithValue }) => {
    try {
      // Make the API call
      const response = await CONSTANTS.FUNCTIONS.AXIOS.GET(
        `${CONSTANTS.ENDPOINTS.PROPERTY.GET_BY_HOST_ID}?user_id=${user_id}`
      );

      // Get the JSON response body
      const responseData = response.data;

      // Log the response
      console.log('\x1b[33m RESPONSE: \x1b[0m', responseData);

      // If the response contains an error code, reject the thunk with the error message
      if (!responseData.statusCode) {
        console.log('\x1b[33m GET PROPERTY BY USER ID FAILED \x1b[0m');
        return rejectWithValue(responseData);
      }

      console.log('\x1b[32m GET PROPERTY BY USER ID SUCCESS! \x1b[0m');

      // Return the response data
      return responseData;
    } catch (error) {
      // Log the error
      console.log('\x1b[31m GET PROPERTY BY USER ID ERROR: \x1b[0m', error);
      return rejectWithValue('Error getting property by user id');
    }
  }
);

export default getPropertyByUserId;
