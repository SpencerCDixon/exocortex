import { combineActions, handleActions, createAction } from 'redux-actions';
import { createSelector } from 'reselect';

// ---------
// Constants
// ---------
export const NAME = '@@exo/modes';
export const SWITCH_MODE = `${NAME}/SWITCH_MODE`;
export const TOGGLE_ZEN = `${NAME}/TOGGLE_ZEN`;
export const MODES = {
  editing: 'editing',
  preview: 'preview',
  view: 'view',
};

// -------
// Actions
// -------
export const toggleZen = createAction(TOGGLE_ZEN);
export const actions = {
  toggleZen,
};

// -------
// Reducer
// -------
export const defaultState = {
  zen: true,
};
export default handleActions(
  {
    [TOGGLE_ZEN]: (state, action) => ({
      ...state,
      zen: !state.zen,
    }),
  },
  defaultState,
);

// ---------
// Selectors
// ---------

export const getModeState = state => state.modes;
export const getIsZen = createSelector(getModeState, state => state.zen);
