import { createAsyncThunk } from '@reduxjs/toolkit';
import { CONSTANTS } from '../../../../constants/Constants';

const createBooking = createAsyncThunk(
  'booking/createBooking',
  async (data, { rejectWithValue }) => {
    try {
      console.log('Create booking data: ', data);

      // Make the API call
      const response = await CONSTANTS.FUNCTIONS.AXIOS.POST(
        CONSTANTS.ENDPOINTS.BOOKING.CREATE,
        data
      );

      // Get the JSON response body
      const responseData = response.data;

      // Log the response
      console.log('\x1b[33m CREATE BOOKING: \x1b[0m', responseData);

      // If the response contains an error code, reject the thunk with the error message
      if (!responseData.statusCode) {
        console.log('\x1b[33m CREATE BOOKING FAILED \x1b[0m');
        return rejectWithValue(responseData);
      }

      console.log('\x1b[32m CREATE BOOKING SUCCESS! \x1b[0m');

      // Return the response data
      return responseData;
    } catch (error) {
      // Log the error
      console.log('\x1b[31m CREATE BOOKING ERROR: \x1b[0m', error);
      return rejectWithValue('Error creating booking');
    }
  }
);

export default createBooking;
