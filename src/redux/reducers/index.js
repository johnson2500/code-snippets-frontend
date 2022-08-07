import { combineReducers } from 'redux';
import { projectsReducer } from './projectsReducers';
import { authReducer } from './authReducers';

export default combineReducers({
  projectsReducer,
  authReducer,
});
