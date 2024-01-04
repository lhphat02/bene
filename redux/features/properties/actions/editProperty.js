import { createAsyncThunk } from '@reduxjs/toolkit';
import { CONSTANTS } from '../../../../constants/Constants';

const editProperty = createAsyncThunk(
  'property/editProperty',
  async (data, { rejectWithValue }) => {
    try {
      console.log('Edit property data: \n', data);

      // Make the API call
      const response = await CONSTANTS.FUNCTIONS.AXIOS.POST(
        CONSTANTS.ENDPOINTS.PROPERTY.EDIT,
        data
      );

      // Get the JSON response body
      const responseData = response.data;

      // Log the response
      console.log('\x1b[33m EDIT PROPERTY: \x1b[0m', responseData);

      // If the response contains an error code, reject the thunk with the error message
      if (!responseData.statusCode) {
        console.log('\x1b[33m EDIT PROPERTY FAILED \x1b[0m');
        return rejectWithValue(responseData);
      }

      console.log('\x1b[32m EDIT PROPERTY SUCCESS! \x1b[0m');

      // Return the response data
      return responseData;
    } catch (error) {
      // Log the error
      console.log('\x1b[31m EDIT PROPERTY ERROR: \x1b[0m', error);
      return rejectWithValue('Error editing property');
    }
  }
);

export default editProperty;
