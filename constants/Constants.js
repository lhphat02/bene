/**
 * @fileoverview This file contains the constants used throughout the app.
 * @module constants/Constants
 */

import axios from 'axios';
import { getLocalData } from '../utils/helper/user';

// Alternative host names:
const host_name = 'http://192.168.1.13:5050/'; // Home host name
// const host_name = 'http://localhost:5050/'; // Not work on React Native
// const host_name = 'http://192.168.0.45:5050/'; // For Kai Coffee

export const CONSTANTS = {
  ENDPOINTS: {
    USER: {
      /**
       * The endpoint for user login.
       * @url http://host/users/login
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
       * @url http://host/users/createUser
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
       * @url http://host/users/getUserById
       * @method GET
       * @param {string} user_id - The user id.
       * @returns {number} response.data.statusCode - The status code.
       * @returns {string} response.data.message - The message.
       * @returns {Object} response.data.data - The user data.
       */
      GET_USER: `users/getUserById`,
    },
    PROPERTY: {
      /**
       * The endpoint for creating a property.
       * @url http://host/property/createProperty
       * @method POST
       * @param {Object} data - BODY
       * @param {string} data.user_id - The user id.
       * @param {string} data.property_name - The property name.
       * @param {string} data.description - The description.
       * @param {string} data.address - The address.
       * @param {number} data.price_per_night - The price per night.
       * @param {number} data.max_guests - The maximum number of guests.
       * @param {number} data.beds - The number of beds.
       * @param {number} data.bedrooms - The number of bedrooms.
       * @param {number} data.size - The size.
       * @param {string} data.availability - The availability.
       * @param {string} data.long_lat - The longitude and latitude.
       * @param {string} data.image - The image.
       * @returns {number} response.data.statusCode - The status code.
       * @returns {string} response.data.message - The message.
       * @returns {Object} response.data.data - The property data.
       */
      CREATE: `property/createProperty`,

      /**
       * The endpoint for getting all properties.
       * @url http://host/property/getAllProperties
       * @method GET
       * @returns {number} response.data.statusCode - The status code.
       * @returns {string} response.data.message - The message.
       * @returns {Object[]} response.data.data - The list of properties.
       */
      GET_ALL: `property/getAllProperties`,

      /**
       * The endpoint for getting property by keyword.
       * @url http://host/property/getPropertyBySearchphase
       * @method GET
       * @param {string} keyword - The keyword to search for.
       * @returns {number} response.data.statusCode - The status code.
       * @returns {string} response.data.message - The message.
       * @returns {Object[]} response.data.data - The list of properties.
       */
      GET_BY_KEYWORD: `property/getPropertyBySearchphase`,

      /**
       * The endpoint for getting property by id.
       *
       * @url http://host/property/getPropertyByUserId
       * @method GET
       * @param {string} user_id - The host id.
       * @returns {number} response.data.statusCode - The status code.
       * @returns {string} response.data.message - The message.
       * @returns {Object} response.data.data - The property data.
       */
      GET_BY_HOST_ID: `property/getPropertyByUserId`,

      /**
       * The endpoint for getting property by id.
       *
       * @url http://host/property/getPropertyById
       * @method GET
       * @param {string} property_id - The property id.
       * @returns {number} response.data.statusCode - The status code.
       * @returns {string} response.data.message - The message.
       * @returns {Object} response.data.data - The property data.
       */
      GET_BY_ID: `property/getPropertyById`,

      /**
       * The endpoint for updating a property.
       *
       * @url http://host/property/editProperty
       * @method POST
       * @param {Object} data - BODY
       * @param {string} data.user_id - The user id.
       * @param {string} data.property_name - The property name.
       * @param {string} data.description - The description.
       * @param {string} data.address - The address.
       * @param {number} data.price_per_night - The price per night.
       * @param {number} data.max_guests - The maximum number of guests.
       * @param {number} data.beds - The number of beds.
       * @param {number} data.bedrooms - The number of bedrooms.
       * @param {number} data.size - The size.
       * @param {string} data.availability - The availability.
       * @param {string} data.long_lat - The longitude and latitude.
       * @param {string} data.image - The image.
       * @returns {number} response.data.statusCode - The status code.
       * @returns {string} response.data.message - The message.
       * @returns {Object} response.data.data - The property data.
       */
      EDIT: `property/editProperty`,

      DELETE: `property/deleteProperty`,
    },
    BOOKING: {
      /**
       * The endpoint for creating a booking.
       *
       * @url http://host/booking/createBookingWithNoti
       * @method POST
       * @param {Object} data - BODY
       * @param {string} data.user_id - The user id.
       * @param {string} data.property_id - The property id.
       * @param {string} data.check_in_date - The checkin date.
       * @param {string} data.check_out_date - The checkout date.
       * @param {number} data.total_price - The total price.
       * @param {number} data.guests - The number of guests.
       * @param {string} data.booking_status - The status.
       * @returns {number} response.data.statusCode - The status code.
       * @returns {string} response.data.message - The message.
       * @returns {Object} response.data.data - The booking data.
       */
      CREATE: `booking/createBookingWithNoti`,

      /**
       * The endpoint for getting booking by user id and property id.
       *
       * @url http://host/booking/getBookingByUserIdPropId
       * @method GET
       * @param {string} user_id - The user id.
       * @param {string} property_id - The property id.
       * @returns {number} response.data.statusCode - The status code.
       * @returns {string} response.data.message - The message.
       * @returns {Object} response.data.data - The booking data.
       */
      GET_BY_USER_PROP_ID: `booking/getBookingByUserIdPropId`,

      /**
       * The endpoint for getting booking by user id.
       *
       * @url http://host/booking/getBookingByUserId
       * @method GET
       * @param {string} user_id - The user id.
       * @returns {number} response.data.statusCode - The status code.
       * @returns {string} response.data.message - The message.
       * @returns {Object[]} response.data.data - The booking data.
       */
      GET_BY_ID: `booking/getBookingById`,

      /**
       * The endpoint for getting all bookings.
       *
       * @url http://host/booking/getAllBookings
       * @method GET
       * @returns {number} response.data.statusCode - The status code.
       * @returns {string} response.data.message - The message.
       * @returns {Object[]} response.data.data - The list of bookings.
       */
      GET_ALL: `booking/getAllBookings`,

      /**
       * The endpoint for updating a booking.
       *
       * @url http://host/booking/updateBooking
       * @method POST
       * @param {Object} data - BODY
       * @param {string} data.booking_id - The booking id.
       * @param {string} data.booking_status - The booking status.
       * @returns {number} response.data.statusCode - The status code.
       * @returns {string} response.data.message - The message.
       * @returns {Object} response.data.data - The booking data.
       */
      UPDATE: `booking/updateBooking`,
      DELETE: `booking/deleteBooking`,
    },
    NOTIFICATION: {
      /**
       * The endpoint for creating a notification.
       *
       * @url http://host/notification/createNotification
       * @method POST
       * @param {Object} data - BODY
       * @param {string} data.user_id - The user id.
       * @returns {number} response.data.statusCode - The status code.
       * @returns {string} response.data.message - The message.
       * @returns {Object} response.data.data - The notification list of user.
       */
      GET_BY_USER_ID: `notification/getNotificationByUserId`,

      /**
       * The endpoint for creating a notification.
       *
       * @url http://host/notification/createNotification
       * @method POST
       * @param {Object} data - BODY
       * @param {string} data.user_id - The user id.
       * @param {string} data.booking_id - The booking id.
       * @param {string} data.sender_id - The property id.
       * @param {string} data.receiver_id - The notification type.
       * @param {string} data.message - The notification content.
       * @returns {number} response.data.statusCode - The status code.
       * @returns {string} response.data.message - The message.
       * @returns {Object} response.data.data - The notification data.
       */
      CREATE: `notification/createNotification`,

      /**
       * The endpoint for updating a notification.
       *
       * @url http://host/notification/updateNotification
       * @method POST
       * @param {Object} data - BODY
       * @param {string} data.noti_id - The notification id.
       * @param {string} data.seen - The is_read status.
       * @returns {number} response.data.statusCode - The status code.
       * @returns {string} response.data.message - The message.
       * @returns {Object} response.data.data - Updated notification data.
       */
      UPDATE: `notification/updateNotification`,
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
          const token = await getLocalData('token');

          // If data is provided, return it with the token
          if (data) {
            return {
              ...data,
              Authorization: `Bearer ${token}`,
            };
          }

          // Otherwise, return the token
          return {
            Authorization: `Bearer ${token}`,
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
          const authorization = await CONSTANTS.FUNCTIONS.AXIOS.BEARER_TOKEN();

          headers = {
            ...headers,
            ...authorization,
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
          const authorization = await CONSTANTS.FUNCTIONS.AXIOS.BEARER_TOKEN();

          headers = {
            ...headers,
            ...authorization,
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
