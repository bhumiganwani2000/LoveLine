import {combineReducers} from 'redux';
import auth from './auth/reducer';
import socket from './Socket/reducer';
// import language from './language/reducer';
// import notification from './notification/reducer';

const rootReducer = combineReducers({
  auth,
  socket,
  // language,
  // notification,
});

export default rootReducer;
