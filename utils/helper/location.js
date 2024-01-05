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

/**
 * Get the top 5 nearest locations to the user's location
 *
 * @param {number} userLat The user's latitude
 * @param {number} userLng The user's longitude
 * @param {Array<Object>} locations An array of locations
 * @returns {Array<Object>} An array of the top 5 nearest locations
 */
export const getTop5NearestLocations = (userLat, userLng, locations) => {
  const haversine = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };

  const distances = locations.map((location) => {
    const [lat, lng] = location.long_lat
      .split(';')
      .map((coord) => parseFloat(coord));
    const distance = haversine(userLat, userLng, lat, lng);
    return { location, distance };
  });

  distances.sort((a, b) => a.distance - b.distance);

  return distances.slice(0, 5).map((entry) => entry.location);
};
