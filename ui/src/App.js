import React, { Component } from 'react';
import logo from './logo.svg';
import * as Api from './util/api';

class App extends Component {
  state = { data: null };

  componentDidMount() {
    Api.list()
      .then(res => res.json())
      .then(res => {
        this.setState({ data: res.body });
      });
  }

  render() {
    return (
      <div>
        <h1>Hello from react</h1>
        {JSON.stringify(this.state.data)}
      </div>
    );
  }
}

export default App;
