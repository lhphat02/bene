import { combineReducers } from 'redux';
import authReducer from '../features/auth/reducers/authSlice';
import propertyReducer from '../features/properties/reducers/propertySlice';

const rootReducer = combineReducers({
  auth: authReducer,
  property: propertyReducer,
});

export default rootReducer;
