import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import path from 'path';

const style = {
  textDecoration: 'none',
  color: 'goldenrod',
};

class WikiLink extends Component {
  static propTypes = {
    location: PropTypes.string,
  };

  render() {
    const { location: { pathname }, href, children } = this.props;
    const resolved = path.resolve(pathname, href);

    return (
      <Link style={style} to={resolved}>
        {children}
      </Link>
    );
  }
}

export default withRouter(WikiLink);
