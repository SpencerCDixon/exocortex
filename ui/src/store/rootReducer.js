import { combineReducers } from 'redux';
import settings from './modules/settings';
import hotKeys from './modules/hotKeys';

export default combineReducers({
  settings,
  hotKeys,
});
