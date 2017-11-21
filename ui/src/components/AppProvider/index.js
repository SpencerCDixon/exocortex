import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from 'components/App';

// Global CSS
import 'sanitize.css';
import 'index.css';

class AppProvider extends Component {
 render() {
    return (
      <Router>
        <App />
      </Router>
    );
  }
}

export default AppProvider;
