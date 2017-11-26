import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'store/rootReducer';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false,
      })
    : compose;

export default function(initialState = {}) {
  const middlewares = [thunk];
  const enhancers = [applyMiddleware(...middlewares)];

  return createStore(rootReducer, initialState, composeEnhancers(...enhancers));
}
