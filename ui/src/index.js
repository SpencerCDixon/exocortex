import React from 'react';
import ReactDOM from 'react-dom';
import AppProvider from 'components/AppProvider';
import registerServiceWorker from './registerServiceWorker';
import typography from 'util/typography';
import createStore from 'store/createStore';

typography.injectStyles();

const store = createStore();

ReactDOM.render(<AppProvider store={store} />, document.getElementById('root'));
registerServiceWorker();
