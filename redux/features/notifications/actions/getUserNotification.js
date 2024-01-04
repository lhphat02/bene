import { createAsyncThunk } from '@reduxjs/toolkit';
import { CONSTANTS } from '../../../../constants/Constants';

/**
 * Get user notification thunk
 *
 * @param {string} userId Id of the current user
 * @returns {Object} List of user notifications
 */
const getUserNotification = createAsyncThunk(
  'notification/getUserNotification',
  async (userId, { rejectWithValue }) => {
    try {
      console.log('Get user notification data: ', data);

      // Make the API call
      const response = await CONSTANTS.FUNCTIONS.AXIOS.GET(
        `${CONSTANTS.ENDPOINTS.NOTIFICATION.GET_BY_USER_ID}?user_id=${userId}`
      );

      // Get the JSON response body
      const responseData = response.data;

      // Log the response
      console.log('\x1b[33m GET USER NOTIFICATION: \x1b[0m', responseData);

      // If the response contains an error code, reject the thunk with the error message
      if (!responseData.statusCode) {
        console.log('\x1b[33m GET USER NOTIFICATION FAILED \x1b[0m');
        return rejectWithValue(responseData);
      }

      console.log('\x1b[32m GET USER NOTIFICATION SUCCESS! \x1b[0m');

      // Return the response data
      return responseData;
    } catch (error) {
      // Log the error
      console.log('\x1b[31m GET USER NOTIFICATION ERROR: \x1b[0m', error);
      return rejectWithValue('Error getting user notification');
    }
  }
);

export default getUserNotification;
