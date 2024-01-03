/**
 * Shortens a string to a specified length and adds ellipsis if necessary.
 * @param {string} str - The string to be shortened.
 * @param {number} len - The maximum length of the shortened string.
 * @returns {string} - The shortened string.
 */
export const shortener = (str, len) => {
  if (str.length > len) {
    return `${str.substring(0, len)}...`;
  }
  return str;
};

/**
 * Formats a date into a string representation.
 * @param {Date} date - The date to be formatted.
 * @returns {string} The formatted date string.
 */
export const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
};

/**
 * Calculates the number of days between two dates.
 *
 * @param {string} checkinDate - The check-in date in string format.
 * @param {string} checkoutDate - The check-out date in string format.
 * @returns {number} The number of days between the check-in and check-out dates.
 */
export const getDayCount = (checkinDate, checkoutDate) => {
  const oneDay = 24 * 60 * 60 * 1000;

  const checkinTime = new Date(checkinDate).getTime();
  const checkoutTime = new Date(checkoutDate).getTime();

  const differenceInDays = Math.round(
    Math.abs((checkoutTime - checkinTime) / oneDay)
  );
  return differenceInDays;
};

/**
 * Formats the longitude and latitude into a single string.
 * @param {number} longitude - The longitude value.
 * @param {number} latitude - The latitude value.
 * @returns {string} The formatted string containing the longitude and latitude.
 */
export const formatLongLat = (longtitute, latitude) => {
  return `${longtitute};${latitude}`;
};

/**
 * Destructures a string containing longitude and latitude values separated by a semicolon.
 * @param {string} longlat - The string containing longitude and latitude values.
 * @returns {Object} An object with properties for longitude and latitude.
 */
export const destructureLongLat = (longlat) => {
  const [longtitute, latitude] = longlat.split(';');
  return { longtitute, latitude };
};
