import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
import App from 'components/App';
import { Provider } from 'react-redux';

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
        <Router>
          <App />
        </Router>
      </Provider>
    );
  }
}

export default AppProvider;
