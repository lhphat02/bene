<<<<<<< HEAD
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
=======
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { storeLocalData } from '../../../../utils/helper/user';
>>>>>>> 3f429d6b911a412a8d443984b3636cd6ad17e8e2

const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
<<<<<<< HEAD
      console.log("login");
      console.log("data", data);

      const response = fetch("http://localhost:5050/users/login", data);

      console.log("response", response);

      // const responseData = await response.json();

      // console.log("responseData", responseData);

      // if (!response.resultCode) {
      //   return rejectWithValue(responseData);
      // }

      // return responseData;
    } catch (error) {
      console.error("Error during fetch:", error);
      // Extract only the necessary information from the error
      return rejectWithValue(error.message || "An error occurred");
=======
      console.log('\x1b[33m LOGIN WITH DATA: \x1b[0m', data);

      // Make the API call
      const response = await axios.post(
        'http://192.168.1.10:5050/users/login',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Get the JSON response body
      const responseData = response.data;

      // Log the response
      console.log('\x1b[33m RESPONSE: \x1b[0m', responseData);

      // If the response contains an error code, reject the thunk with the error message
      if (!responseData.resultCode) {
        console.log('\x1b[33m LOGIN FAILED \x1b[0m');
        return rejectWithValue(responseData);
      }

      // Store the user_id in AsyncStorage
      await storeLocalData('userId', responseData.data._id);

      // Store the token in AsyncStorage
      await storeLocalData('token', responseData.data.token);

      console.log('\x1b[33m LOGIN SUCCESS! \x1b[0m');

      // Return the response data
      return responseData;
    } catch (error) {
      // Log the error
      console.error('\x1b[33m LOGIN ERROR: \x1b[0m', error);
      return rejectWithValue(error.message || 'An error occurred');
>>>>>>> 3f429d6b911a412a8d443984b3636cd6ad17e8e2
    }
  }
);

<<<<<<< HEAD
export const loginStatic = (user) => (
  {
    type: "auth/loginStatic",
    payload: user,
  },
  () => {
    console.log("loginStatic");
    console.log("user", user);
  }
);

=======
>>>>>>> 3f429d6b911a412a8d443984b3636cd6ad17e8e2
export default login;
