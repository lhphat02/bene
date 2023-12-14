// External imports
import { useState, useEffect, useRef } from 'react';

// 20520683 - Luu Huynh Phat
/**
 * Custom hook to implement debouncing for a given value.
 * @param {any} value - The value to debounce
 * @param {number} delay - The debounce delay in milliseconds
 * @returns {any} The debounced value
 */
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  // Create a timeout reference to track the pending debounce
  const timeoutRef = useRef(null);

  // Update the debounced value with a delay
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    timeoutRef.current = timeoutId;

    // Clean up the timeout when the component unmounts or the value changes
    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
