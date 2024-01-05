import { createAsyncThunk } from '@reduxjs/toolkit';
import { CONSTANTS } from '../../../../constants/Constants';

/**
 * Update booking status thunk
 *
 * @param {Object} data Data to update booking status
 * @param {string} data.booking_id Id of the booking
 * @param {string} data.booking_status Status of the booking
 * @param {string} data.sender_id Id of the sender
 * @param {string} data.reciever_id Id of the reciever
 * @returns {Object} Updated booking status
 */
const updateBookingStatus = createAsyncThunk(
  'booking/updateBookingStatus',
  async (data, { rejectWithValue }) => {
    try {
      console.log('Update booking status data: ', data);

      // Make the API call
      const bookingResponse = await CONSTANTS.FUNCTIONS.AXIOS.POST(
        `${CONSTANTS.ENDPOINTS.BOOKING.UPDATE}`,
        data
      );

      // Get the JSON response body
      const bookingResponseData = bookingResponse.data;

      // Log the response
      console.log(
        '\x1b[33m UPDATE BOOKING STATUS: \x1b[0m',
        bookingResponseData
      );

      // If the response contains an error code, reject the thunk with the error message
      if (!bookingResponseData.statusCode) {
        console.log('\x1b[33m UPDATE BOOKING STATUS FAILED \x1b[0m');
        return rejectWithValue(bookingResponseData);
      }

      console.log('\x1b[32m UPDATE BOOKING STATUS SUCCESS! \x1b[0m');

      // Return the merged data
      return bookingResponseData;
    } catch (error) {
      // Log the error
      console.log('\x1b[31m UPDATE BOOKING STATUS ERROR: \x1b[0m', error);
      return rejectWithValue('Error updating booking status');
    }
  }
);

export default updateBookingStatus;
