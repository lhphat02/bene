import { createAsyncThunk } from '@reduxjs/toolkit';
import { CONSTANTS } from '../../../../constants/Constants';

const createProperty = createAsyncThunk(
  'property/createProperty',
  async (data, { rejectWithValue }) => {
    try {
      console.log('Create property data: ', data);

      // Make the API call
      const response = await CONSTANTS.FUNCTIONS.AXIOS.POST(
        CONSTANTS.ENDPOINTS.PROPERTY.CREATE,
        data
      );

      // Get the JSON response body
      const responseData = response.data;

      // Log the response
      console.log('\x1b[33m CREATE PROPERTY: \x1b[0m', responseData);

      // If the response contains an error code, reject the thunk with the error message
      if (!responseData.statusCode) {
        console.log('\x1b[33m CREATE PROPERTY FAILED \x1b[0m');
        return rejectWithValue(responseData);
      }

      console.log('\x1b[32m CREATE PROPERTY SUCCESS! \x1b[0m');

      // Return the response data
      return responseData;
    } catch (error) {
      // Log the error
      console.log('\x1b[31m CREATE PROPERTY ERROR: \x1b[0m', error);
      return rejectWithValue('Error creating property');
    }
  }
);

export default createProperty;
