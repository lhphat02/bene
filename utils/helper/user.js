import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Stores data in local storage.
 * @param {string} key - The key to store the data under.
 * @param {string} value - The value to store.
 * @returns {Promise<void>} - A promise that resolves when the data is stored successfully.
 */
export const storeLocalData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
      .then(() => console.log(`${key} stored successfully`))
      .catch((error) => console.error(`Error storing ${key}`, error));
  } catch (error) {
    console.error(`Error storing ${key}: `, error);
  }
};

/**
 * Retrieves the value associated with the given key from local storage.
 * @param {string} key - The key to retrieve the value for.
 * @returns {Promise<string|null>} - The value associated with the key, or null if not found.
 */
export const getLocalData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);

    if (!value) {
      console.log(`${key} not found`);
      return null;
    }

    return value;
  } catch (error) {
    console.error(`Error retrieving ${key}: `, error);
  }
};

/**
 * Removes the value associated with the given key from local storage.
 * @param {string} key - The key to remove the value for.
 * @returns {Promise<void>} - A promise that resolves when the value is removed successfully.
 */
export const removeLocalData = async (key) => {
  try {
    await AsyncStorage.removeItem(key)
      .then(() => console.log(`${key} removed`))
      .catch((error) => console.error(`Error removing ${key}: `, error));
  } catch (error) {
    console.error(`Error removing ${key}: `, error);
  }
};

/**
 * Removes all data from local storage.
 * @returns {Promise<void>} - A promise that resolves when all data is removed successfully.
 */
export const clearLocalStorage = async () => {
  try {
    await AsyncStorage.clear()
      .then(() => console.log('Local storage cleared'))
      .catch((error) => console.error('Error clearing local storage: ', error));
  } catch (error) {
    console.error('Error clearing local storage: ', error);
  }
};
