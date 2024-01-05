import { createAsyncThunk } from '@reduxjs/toolkit';
import { CONSTANTS } from '../../../../constants/Constants';

/**
 * Create notification thunk
 *
 * @param {Object} data Data to create notification
 * @param {string} data.user_id Id of the user
 * @param {string} data.receiver_id Id of the receiver
 * @param {string} data.sender_id Id of the sender
 * @param {string} data.booking_id Id of the booking
 * @param {string} data.message Message of the notification
 * @returns {Object} Created notification
 */
const createNotification = createAsyncThunk(
  'notification/createNotification',
  async (data, { rejectWithValue }) => {
    try {
      console.log('Create notification data: ', data);

      // Make the API call
      const notificationResponse = await CONSTANTS.FUNCTIONS.AXIOS.POST(
        `${CONSTANTS.ENDPOINTS.NOTIFICATION.CREATE}`,
        data
      );

      // Get the JSON response body
      const notificationResponseData = notificationResponse.data;

      // Log the response
      console.log(
        '\x1b[33m CREATE NOTIFICATION: \x1b[0m',
        notificationResponseData
      );

      // If the response contains an error code, reject the thunk with the error message
      if (!notificationResponseData.statusCode) {
        console.log('\x1b[33m CREATE NOTIFICATION FAILED \x1b[0m');
        return rejectWithValue(notificationResponseData);
      }

      console.log('\x1b[32m CREATE NOTIFICATION SUCCESS! \x1b[0m');

      return notificationResponseData;
    } catch (error) {
      console.log('\x1b[31m CREATE NOTIFICATION ERROR: \x1b[0m', error);
      return rejectWithValue(error.response.data);
    }
  }
);

export default createNotification;
