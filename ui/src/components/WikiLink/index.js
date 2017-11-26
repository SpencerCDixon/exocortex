import React, { Component } from 'react';
import { withRouter, Link as RouterLink } from 'react-router-dom';
import { HashLink as RouterHashLink } from 'react-router-hash-link';
import { isExternalURL } from 'util/path';
import styled from 'styled-components';
import path from 'path';

const styles = `
  border-bottom: 2px solid rgb(207, 243, 255);
  text-decoration: none;
  transition: box-shadow ease 160ms;
  box-shadow: inset 0 -9px 0 rgb(238, 251, 255);
  color: hsla(0,0%,0%,0.8);

  &:hover {
    box-shadow: inset 0 -1.2em 0 rgb(207, 243, 255);
  }
`;

const Link = styled(RouterLink)`
  ${styles};
`;
const HashLink = styled(RouterHashLink)`
  ${styles};
`;

// TODO: on mount, check if this is a link to another wiki page.  If so, just
// spin off fetching requests for that page so it's ready in the cache when user
// wants to visit it.
class WikiLink extends Component {
  render() {
    const { href, children, match: { params: { page } } } = this.props;

    let resolved;
    if (href[0] === '#') {
      resolved = path.resolve('/wiki/', page + href);
    } else {
      resolved = path.resolve('/wiki/', href);
    }
    const isExternal = isExternalURL(href);
    const isHash = href[0] === '#';

    if (isHash) {
      return <HashLink to={resolved}>{children}</HashLink>;
    } else {
      return (
        <Link
          target={isExternal ? '_blank' : ''}
          to={isExternal ? href : resolved}>
          {children}
        </Link>
      );
    }
  }
}

export default withRouter(WikiLink);
