import { useState, useEffect } from 'react';
import axios from 'axios';

import { CONSTANTS } from '../constants/Constants';
import { getLocalData } from '../utils/helper/user';

const useUserData = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const userId = await getLocalData('userId');
        console.log('\x1b[32m START GETTING USER DATA \x1b[0m');

        console.log('\x1b[32m USING USER ID: \x1b[0m', userId);

        const response = await axios.get(
          'http://192.168.1.10:5050/users/getUserById',
          {
            params: {
              user_id: userId,
            },
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const result = response.data;

        console.log('\x1b[33m USER DATA: \x1b[0m', result);

        setUserData(result.data);
      } catch (err) {
        setError(err);
        console.log('\x1b[31m ERROR: \x1b[0m', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return { userData, error, loading };
};

export default useUserData;
