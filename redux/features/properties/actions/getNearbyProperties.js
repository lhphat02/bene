import { createAsyncThunk } from '@reduxjs/toolkit';
import { CONSTANTS } from '../../../../constants/Constants';

const getNearbyProperties = createAsyncThunk(
  'property/getNearbyProperties',
  async (data, { rejectWithValue }) => {
    try {
      // Make the API call
      const response = await CONSTANTS.FUNCTIONS.AXIOS.GET(
        CONSTANTS.ENDPOINTS.PROPERTY.GET_ALL
      );

      // Get the JSON response body
      const responseData = response.data;

      // Log the response
      console.log(
        '\x1b[33m NEARBY PROPERTIES COUNT: \x1b[0m',
        responseData.data.length
      );

      // If the response contains an error code, reject the thunk with the error message
      if (!responseData.statusCode) {
        console.log('\x1b[33m GET NEARBY PROPERTIES FAILED \x1b[0m');
        return rejectWithValue(responseData);
      }

      console.log('\x1b[32m GET NEARBY PROPERTIES SUCCESS! \x1b[0m');

      const nearbyProperties = responseData.data.filter((property) => {
        return property.location === location;
      });

      // Return the response data
      return responseData;
    } catch (error) {
      // Log the error
      console.log('\x1b[31m GET NEARBY PROPERTIES ERROR: \x1b[0m', error);
      return rejectWithValue('Error getting nearby properties');
    }
  }
);

export default getAllProperties;
