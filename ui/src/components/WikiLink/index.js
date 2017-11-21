import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const style = {
  textDecoration: 'none',
  color: 'goldenrod',
};

class WikiLink extends Component {
  static propTypes = {};

  render() {
    const { href, children } = this.props;

    return (
      <Link style={style} to={`/wiki/${href}`}>
        {children}
      </Link>
    );
  }
}

export default WikiLink;
