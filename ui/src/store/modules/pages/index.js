import { combineActions, handleActions, createAction } from 'redux-actions';
import { createSelector } from 'reselect';
import * as Api from 'util/api';
import history from 'util/history';

// ---------
// Constants
// ---------
export const NAME = '@@exo/pages';
export const FETCHED_PAGE = `${NAME}/FETCHED_PAGE`;
export const SAVED_PAGE = `${NAME}/SAVED_PAGE`;
export const EDIT_PAGE = `${NAME}/EDIT_PAGE`;
export const DELETED_PAGE = `${NAME}/DELETED_PAGE`;

// -------
// Actions
// -------
const fetchedPage = createAction(FETCHED_PAGE);
const savedPage = createAction(SAVED_PAGE);
const deletedPage = createAction(DELETED_PAGE);

export const viewPage = page => dispatch => {
  Api.view(page)
    .then(({ data, status }) => {
      if (status === 404) {
        history.push(`/wiki/new/${page}`);
      } else {
        dispatch(fetchedPage({ page, content: data.body }));
        history.push(`/wiki/${page}`);
      }
    })
    .catch(() => {
      history.push(`/wiki/new/${page}`);
    });
};

export const savePage = (page, newContent) => dispatch => {
  Api.save(page, newContent).then(() => {
    dispatch(savedPage({ page, content: newContent }));
    history.push(`/wiki/${page}`);
  });
};

export const editPage = page => dispatch => {
  dispatch({ type: EDIT_PAGE });
  const editLoc = `/wiki/edit/${page}`;
  history.push(editLoc);
};

export const deletePage = page => dispatch => {
  Api.deletePage(page)
    .then(() => {
      dispatch(deletedPage({ page }));
      history.push(`/wiki`);
    })
    .catch(err => {
      console.error(err);
      alert('Something went wrong');
    });
};

export const prefetchPage = page => dispatch => {
  Api.view(page).then(({ data, status }) => {
    if (status === 200) {
      dispatch(fetchedPage({ page, content: data.body }));
    }
  });
};

export const actions = {
  viewPage,
  savePage,
  editPage,
  deletePage,
};

// -------
// Reducer
// -------
export const defaultState = {
  pages: {},
  mode: 'view',
};
export default handleActions(
  {
    [combineActions(FETCHED_PAGE, SAVED_PAGE)]: (
      state,
      { payload: { page, content } },
    ) => ({
      ...state,
      pages: {
        ...state.pages,
        [page]: content,
      },
    }),
    [EDIT_PAGE]: (state, action) => ({
      ...state,
      mode: 'edit',
    }),
    [DELETED_PAGE]: (state, { payload: { page } }) => {
      const copy = { ...state };
      delete copy.pages[page];
      return copy;
    },
  },
  defaultState,
);

// ---------
// Selectors
// ---------
const getLocal = state => state.pages;
const getPage = (_, props) => props.match.params.page;
export const getIsEditing = createSelector(
  getLocal,
  state => state.mode === 'edit',
);
export const getIsViewing = createSelector(
  getLocal,
  state => state.mode === 'view',
);
export const getCurrentPage = createSelector(
  [getLocal, getPage],
  (state, page) => state.pages[page],
);
