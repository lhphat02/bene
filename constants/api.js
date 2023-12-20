import axios from 'axios';

const path = 'http://localhost:5050/';

const CONSTANTS = {
  API: {
    USER: {
      LOGIN: `${path}/users/login`,
      REGISTER: `${path}/users/createUser`,
    },
    PROPERTY: {
      CREATE: `${path}/property/createProperty`,
      GET_ALL: `${path}/property/getAllProperties`,
      EDIT: `${path}/property/editProperty`,
      DELETE: `${path}/property/deleteProperty`,
    },
    BOOKING: {
      CREATE: `${path}/booking/createBooking`,
      GET_ALL: `${path}/booking/getAllBookings`,
      UPDATE: `${path}/booking/updateBooking`,
      DELETE: `${path}/booking/deleteBooking`,
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
      BEARER_TOKEN: (data) => {
        try {
          // Get the token from local storage
          const tokenObject = JSON.parse(localStorage.getItem('token'));
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
       * @param {string} screenId - The screen ID to include in the headers.
       * @returns {Promise} A promise that resolves with the response data.
       */
      POST: async (url, data, screenId) => {
        // Send the request
        const response = await axios.post(
          host_name + url,
          CONSTANTS.FUNCTIONS.AXIOS.ENCODE_FORM_DATA(data),
          {
            headers: {
              ...CONSTANTS.FUNCTIONS.AXIOS.BEARER_TOKEN(),
              screen_id: screenId,
            },
          }
        );

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

export default CONSTANTS;
