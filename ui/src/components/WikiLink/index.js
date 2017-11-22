import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import path from 'path';

const style = {
  textDecoration: 'none',
  color: 'goldenrod',
};

class WikiLink extends Component {
  render() {
    const { href, children } = this.props;
    const resolved = path.resolve('/wiki/', href);

    return (
      <Link style={style} to={resolved}>
        {children}
      </Link>
    );
  }
}

export default WikiLink;
