import React, { Component } from 'react';
import NavBar from 'components/NavBar';
import { Redirect, Switch, Route } from 'react-router-dom';

// Pages
import HomePage from 'pages/HomePage';
import WikiPage from 'pages/WikiPage';
import NewWikiPage from 'pages/NewWikiPage';
import EditWikiPage from 'pages/EditWikiPage';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/wiki" component={HomePage} />
          <Route path="/wiki/new/:page*" component={NewWikiPage} />
          <Route path="/wiki/edit/:page*" component={EditWikiPage} />
          <Route path="/wiki/:page*" component={WikiPage} />
          <Redirect to="/wiki" />
        </Switch>
      </div>
    );
  }
}

export default App;
