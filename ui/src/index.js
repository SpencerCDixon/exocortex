import React from 'react';
import ReactDOM from 'react-dom';
import AppProvider from 'components/AppProvider';
import registerServiceWorker from './registerServiceWorker';
import typography from 'util/typography';

typography.injectStyles();

ReactDOM.render(<AppProvider />, document.getElementById('root'));
registerServiceWorker();
