import { combineReducers } from 'redux';
import settings from './modules/settings';
import hotKeys from './modules/hotKeys';
import pages from './modules/pages';

export default combineReducers({
  settings,
  hotKeys,
  pages,
});
