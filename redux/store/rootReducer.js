import { combineReducers } from 'redux';
import authReducer from '../features/auth/reducers/authSlice';
import propertyReducer from '../features/properties/reducers/propertySlice';
import bookingReducer from '../features/bookings/reducers/bookingSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  property: propertyReducer,
  booking: bookingReducer,
});

export default rootReducer;
