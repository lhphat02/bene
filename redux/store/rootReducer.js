import { combineReducers } from 'redux';
import authReducer from '../features/auth/reducers/authSlice';
import propertyReducer from '../features/properties/reducers/propertySlice';
import bookingReducer from '../features/bookings/reducers/bookingSlice';
import notificationReducer from '../features/notifications/reducers/notificationSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  property: propertyReducer,
  booking: bookingReducer,
  notification: notificationReducer,
});

export default rootReducer;
