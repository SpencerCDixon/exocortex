import { combineReducers } from 'redux';
import settings from './modules/settings';
import modes from './modules/modes';

export default combineReducers({
  settings,
  modes,
});
