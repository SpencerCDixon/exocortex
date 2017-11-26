import { handleActions, createAction } from 'redux-actions';
import { createSelector } from 'reselect';

// ---------
// Constants
// ---------
export const NAME = '@@exo/hotKeys';
export const TOGGLE_ZEN = `${NAME}/TOGGLE_ZEN`;
export const TOGGLE_HELP = `${NAME}/TOGGLE_HELP`;

// -------
// Actions
// -------
export const toggleZen = createAction(TOGGLE_ZEN);
export const toggleHelp = createAction(TOGGLE_HELP);
export const actions = {
  toggleZen,
  toggleHelp,
};

// -------
// Reducer
// -------
export const defaultState = {
  zen: false,
  help: false,
};
export default handleActions(
  {
    [TOGGLE_ZEN]: (state, action) => ({
      ...state,
      zen: !state.zen,
    }),
    [TOGGLE_HELP]: (state, action) => ({
      ...state,
      help: !state.help,
    }),
  },
  defaultState,
);

// ---------
// Selectors
// ---------
const getLocal = state => state.hotKeys;
export const getIsZen = createSelector(getLocal, state => state.zen);
export const getIsHelpOn = createSelector(getLocal, state => state.help);
