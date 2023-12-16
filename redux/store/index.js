import { ConfigureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const store = ConfigureStore({
  reducer: rootReducer,
});

export default store;
