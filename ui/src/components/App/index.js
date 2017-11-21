import React, { Component } from 'react';
import * as Api from 'util/api';
import Markdown from 'components/Markdown';
import NavBar from 'components/NavBar';
import { Redirect, Switch, Route } from 'react-router-dom';

// Pages
import HomePage from 'pages/HomePage';
import WikiPage from 'pages/WikiPage';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route path="/wiki/:page" component={WikiPage} />
          <Route path="/wiki" component={HomePage} />
          <Redirect to="/wiki" />
        </Switch>
      </div>
    );
  }
}

export default App;
