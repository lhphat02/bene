import * as Location from 'expo-location';

export const getLocationFromAddress = async (address) => {
  try {
    const result = await Location.geocodeAsync(address);
    return result;
  } catch (error) {
    console.log('\x1b[33m ERROR: \x1b[0m', error);
  }
};
