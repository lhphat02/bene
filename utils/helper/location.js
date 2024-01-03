import * as Location from 'expo-location';

/**
 * Retrieves the location coordinates from an address.
 * @param {string} address - The address to geocode.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of location objects.
 * @throws {Error} - If permission to access location is denied or if an error occurs during geocoding.
 */
export const getLocationFromAddress = async (address) => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      throw new Error('Permission to access location was denied');
    }

    const result = await Location.geocodeAsync(address);

    return result;
  } catch (error) {
    console.log('\x1b[33m ERROR: \x1b[0m', error);
  }
};

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // in metres

  return d / 1000; // in km
};
