import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/reducers/authSlice';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
