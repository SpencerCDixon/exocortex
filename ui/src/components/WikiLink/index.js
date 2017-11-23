import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import path from 'path';

const style = {
  textDecoration: 'none',
  color: 'goldenrod',
};

class WikiLink extends Component {
  render() {
    const { match: { params: { page } } } = this.props;
    const { href, children } = this.props;
    let resolved;
    if (href[0] === '#') {
      resolved = path.resolve('/wiki/', page + href);
    } else {
      resolved = path.resolve('/wiki/', href);
    }
    const isExternal = href.indexOf('http') > -1;
    const isHash = href[0] === '#';

    if (isHash) {
      return <HashLink to={resolved}>{children}</HashLink>;
    } else {
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
}

export default withRouter(WikiLink);
