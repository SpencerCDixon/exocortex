import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import path from 'path';

const style = {
  textDecoration: 'none',
  color: 'goldenrod',
};

class WikiLink extends Component {
  render() {
    const { href, children } = this.props;
    const isExternal = href.indexOf('http') > -1;
    const resolved = path.resolve('/wiki/', href);

    return (
      <Link
        target={isExternal ? '_blank' : ''}
        style={style}
        to={isExternal ? href : resolved}>
        {children}
      </Link>
    );
  }
}

export default WikiLink;
