/**
 * Generates a random house image URL using the Unsplash API.
 *
 * @returns {string} The URL of a random house image.
 */
export const getRandomHouseImage = () => {
  const unsplashApiUrl = 'https://source.unsplash.com/featured/?house';
  return `${unsplashApiUrl}&${new Date().getTime()}`;
};
