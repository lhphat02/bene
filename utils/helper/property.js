import { CONSTANTS } from '../../constants/Constants';
import { getLocalData } from './user';

/**
 * Generates a random house image URL using the Unsplash API.
 *
 * @returns {string} The URL of a random house image.
 */
export const getRandomHouseImage = () => {
  const unsplashApiUrl = 'https://source.unsplash.com/featured/?house';
  return `${unsplashApiUrl}&${new Date().getTime()}`;
};

/**
 * Checks if a property is booked by user.
 *
 * @param {string} propertyId - The ID of the property.
 * @returns {boolean} Whether the property is booked by the user.
 */
export const checkPropertyIsBooked = async (propertyId) => {
  try {
    const userId = await getLocalData('userId');

    const response = await CONSTANTS.FUNCTIONS.AXIOS.GET(
      `${CONSTANTS.ENDPOINTS.BOOKING.GET_BY_USER_PROP_ID}?user_id=${userId}&property_id=${propertyId}`
    );

    const responseData = await response.data.data;

    console.log('\x1b[33m GET BOOKING: \x1b[0m', responseData);

    const isBooked = Boolean(responseData);

    return isBooked;
  } catch (error) {
    console.log(error);
  }
};
