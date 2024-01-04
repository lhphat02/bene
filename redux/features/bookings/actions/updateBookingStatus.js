import { createAsyncThunk } from '@reduxjs/toolkit';
import { CONSTANTS } from '../../../../constants/Constants';

const updateBookingStatus = createAsyncThunk(
  'booking/updateBookingStatus',
  async (data, { rejectWithValue }) => {
    try {
      console.log('Update booking status data: ', data);

      // Make the API call
      const response = await CONSTANTS.FUNCTIONS.AXIOS.PUT(
        `${CONSTANTS.ENDPOINTS.BOOKING.UPDATE_BOOKING_STATUS}`,
        data
      );

      // Get the JSON response body
      const responseData = response.data;

      // Log the response
      console.log('\x1b[33m UPDATE BOOKING STATUS: \x1b[0m', responseData);

      // If the response contains an error code, reject the thunk with the error message
      if (!responseData.statusCode) {
        console.log('\x1b[33m UPDATE BOOKING STATUS FAILED \x1b[0m');
        return rejectWithValue(responseData);
      }

      console.log('\x1b[32m UPDATE BOOKING STATUS SUCCESS! \x1b[0m');

      // Return the response data
      return responseData;
    } catch (error) {
      // Log the error
      console.log('\x1b[31m UPDATE BOOKING STATUS ERROR: \x1b[0m', error);
      return rejectWithValue('Error updating booking status');
    }
  }
);

export default updateBookingStatus;
