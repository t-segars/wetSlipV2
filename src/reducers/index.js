import { combineReducers } from 'redux';
import hoodie from './hoodie';
import authReducer from './authReducer';
import connectionStatus from './connectionStatus';
import hireaboat from './hireaboat';
import listBoatsReducer from './listBoatsReducer';
import selectBoatReducer from './selectBoatReducer';
import similarBoatsReducer from './similarBoatsReducer';
import bookingCardReducer from './bookingCardReducer';
import currentUserReducer from './currentUserReducer';
import checkoutDataReducer from './checkOutDataReducer';
import userProfileReducer from './userProfileReducer';
import conversationReducer from './conversationReducer';
import location from './location';

export default combineReducers({
  hoodie,
  auth: authReducer,
  connectionStatus,
  hireaboat,
  boatList: listBoatsReducer,
  selectBoat: selectBoatReducer,
  similarBoats: similarBoatsReducer,
  bookingCard: bookingCardReducer,
  currentUser: currentUserReducer,
  checkoutData: checkoutDataReducer,
  userProfile: userProfileReducer,
  conversation: conversationReducer,
  location,
});
