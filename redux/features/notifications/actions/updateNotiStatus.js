import { createAsyncThunk } from '@reduxjs/toolkit';
import { CONSTANTS } from '../../../../constants/Constants';

/**
 * Update notification status thunk
 *
 * @param {Object} data Data to update notification status
 * @param {string} data.noti_id Id of the notification
 * @param {string} data.seen Status of the notification
 * @returns {Object} Updated notification status
 */
const updateNotiStatus = createAsyncThunk(
  'notification/updateNotiStatus',
  async (data, { rejectWithValue }) => {
    try {
      console.log('Update notification status data: ', data);

      // Make the API call
      const notificationResponse = await CONSTANTS.FUNCTIONS.AXIOS.POST(
        `${CONSTANTS.ENDPOINTS.NOTIFICATION.UPDATE}`,
        data
      );

      // Get the JSON response body
      const notificationResponseData = notificationResponse.data;

      // Log the response
      console.log(
        '\x1b[33m UPDATE NOTIFICATION STATUS: \x1b[0m',
        notificationResponseData
      );

      // If the response contains an error code, reject the thunk with the error message
      if (!notificationResponseData.statusCode) {
        console.log('\x1b[33m UPDATE NOTIFICATION STATUS FAILED \x1b[0m');
        return rejectWithValue(notificationResponseData);
      }

      console.log('\x1b[32m UPDATE NOTIFICATION STATUS SUCCESS! \x1b[0m');

      return notificationResponseData;
    } catch (error) {
      console.log('\x1b[31m UPDATE NOTIFICATION STATUS ERROR: \x1b[0m', error);
      return rejectWithValue(error.response.data);
    }
  }
);

export default updateNotiStatus;
