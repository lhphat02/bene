import { combineReducers } from 'redux';
import authReducer from '../features/auth/reducers/authSlice';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
