import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router-dom';
import App from 'components/App';
import { Provider } from 'react-redux';
import history from 'util/history';

// Global CSS
import 'sanitize.css';
import 'index.css';

class AppProvider extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  };

  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
  }
}

export default AppProvider;
