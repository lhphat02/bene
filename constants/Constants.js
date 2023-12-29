/**
 * @fileoverview This file contains the constants used throughout the app.
 * @module constants/Constants
 */

import axios from 'axios';
import { getLocalData } from '../utils/helper/user';

// Alternative host names:
const host_name = 'http://192.168.1.10:5050/'; // Home host name
// const host_name = 'http://localhost:5050/'; // Not work on React Native
// const host_name = 'http://192.168.1.69:5050/'; // For Kai Coffee

export const CONSTANTS = {
  ENDPOINTS: {
    USER: {
      /**
       * The endpoint for user login.
       * @url http://{host}/users/login
       * @method POST
       * @param {Object} data - BODY
       * @param {string} data.username - The username.
       * @param {string} data.password - The password (not encrypted).
       * @returns {number} response.data.statusCode - The status code.
       * @returns {string} response.data.message - The message.
       * @returns {Object} response.data.data - The user data.
       */
      LOGIN: `users/login`,

      /**
       * The endpoint for user registration.
       * @url http://{host}/users/createUser
       * @method POST
       * @param {Object} data - BODY
       * @param {string} data.username - The username.
       * @param {string} data.password - The password (not encrypted).
       * @param {string} data.email - The email.
       * @param {string} data.phone - The phone number.
       * @param {string} data.address - The address.
       * @returns {number} response.data.statusCode - The status code.
       * @returns {string} response.data.message - The message.
       * @returns {Object} response.data.data - The user data.
       */
      REGISTER: `users/createUser`,

      /**
       * The endpoint for getting user by id.
       * @url http://{host}/users/getUserById
       * @method GET
       * @param {string} user_id - The user id.
       * @returns {number} response.data.statusCode - The status code.
       * @returns {string} response.data.message - The message.
       * @returns {Object} response.data.data - The user data.
       */
      GET_USER: `users/getUserById`,
    },
    PROPERTY: {
      CREATE: `property/createProperty`,

      /**
       * The endpoint for getting all properties.
       * @url http://{host}/property/getAllProperties
       * @method GET
       * @returns {number} response.data.statusCode - The status code.
       * @returns {string} response.data.message - The message.
       * @returns {Object[]} response.data.data - The list of properties.
       */
      GET_ALL: `property/getAllProperties`,

      /**
       * The endpoint for getting property by keyword.
       * @url http://{host}/property/getPropertyBySearchphase
       * @method GET
       * @param {string} keyword - The keyword to search for.
       * @returns {number} response.data.statusCode - The status code.
       * @returns {string} response.data.message - The message.
       * @returns {Object[]} response.data.data - The list of properties.
       */
      GET_BY_KEYWORD: `property/getPropertyBySearchphase`,
      EDIT: `property/editProperty`,
      DELETE: `property/deleteProperty`,
    },
    BOOKING: {
      CREATE: `booking/createBooking`,
      GET_ALL: `booking/getAllBookings`,
      UPDATE: `booking/updateBooking`,
      DELETE: `booking/deleteBooking`,
    },
  },
  FUNCTIONS: {
    AXIOS: {
      /**
       * Creates an Axios config object with a bearer token.
       *
       * @function BEARER_TOKEN
       * @param {Object} [data] - Optional data to include in the config.
       * @returns {Object} The Axios config object.
       * @throws {Error} If an error occurs during token retrieval.
       */
      BEARER_TOKEN: async (data) => {
        try {
          // Get the token from local storage
          const tokenObject = await JSON.parse(getLocalData('token'));
          const token = tokenObject.token;

          // If data is provided, return it with the token
          if (data) {
            return {
              ...data,
              Authorization: `bearer ${token}`,
            };
          }

          // Otherwise, return the token
          return {
            Authorization: `bearer ${token}`,
          };
        } catch (error) {
          console.log('Error getting token: ', error);
        }
      },

      /**
       * Encodes an object into a URL-encoded form data string.
       *
       * @function ENCODE_FORM_DATA
       * @param {Object} data - The object to encode.
       * @returns {string|null} The URL-encoded form data string, or null if data is falsy.
       */
      ENCODE_FORM_DATA: (data) => {
        try {
          // If data is falsy, return null
          if (!data) {
            return null;
          }

          // If data is an object, encode it
          return Object.keys(data)
            .map(
              (key) =>
                encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
            )
            .join('&');
        } catch (error) {
          console.log('Error encoding data: ', error);
          return null;
        }
      },

      /**
       * Sends a POST request using Axios.
       *
       * @async
       * @function POST
       * @param {string} url - The endpoint URL.
       * @param {Object} data - The data to send.
       * @param {boolean} includeBearerToken - Whether to include the bearer token in the request headers.
       * @returns {Promise} A promise that resolves with the response data.
       */
      POST: async (url, data, includeBearerToken = true) => {
        // Prepare headers
        let headers = {};
        if (includeBearerToken) {
          headers = {
            ...headers,
            ...CONSTANTS.FUNCTIONS.AXIOS.BEARER_TOKEN(),
          };
        }

        // Send the request
        const response = await axios.post(host_name + url, data, {
          headers: headers,
        });

        // If the response data is a string, parse it into an object
        if (typeof response.data === 'string') {
          return {
            ...response,
            data: JSON.parse(response.data.trim()),
          };
        }

        return response;
      },

      /**
       * Sends a GET request using Axios.
       *
       * @async
       * @function GET
       * @param {string} url - The endpoint URL.
       * @param {boolean} includeBearerToken - Whether to include the bearer token in the request headers.
       * @returns {Promise} A promise that resolves with the response data.
       */
      GET: async (url, includeBearerToken = true) => {
        // Prepare headers
        let headers = {};
        if (includeBearerToken) {
          headers = {
            ...headers,
            ...CONSTANTS.FUNCTIONS.AXIOS.BEARER_TOKEN(),
          };
        }

        // Send the request
        const response = await axios.get(host_name + url, {
          headers: headers,
        });

        // If the response data is a string, parse it into an object
        if (typeof response.data === 'string') {
          return {
            ...response,
            data: JSON.parse(response.data.trim()),
          };
        }

        return response;
      },
    },
  },
};
