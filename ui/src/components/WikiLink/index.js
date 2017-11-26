import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link as RouterLink } from 'react-router-dom';
import { HashLink as RouterHashLink } from 'react-router-hash-link';
import { isExternalURL } from 'util/path';
import { connect } from 'react-redux';
import { prefetchPage } from 'store/modules/pages';
import { compose } from 'redux';
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

class WikiLink extends Component {
  static propTypes = {
    prefetchPage: PropTypes.func.isRequired,
  };

  componentDidMount() {
    // If linking to another wiki page
    if (!this.isHash && !this.isExternal) {
      const { href } = this.props;
      const withoutWikiPrefix = this.resolvedPath.replace('/wiki/', '');
      this.props.prefetchPage(withoutWikiPrefix);
    }
  }

  get isHash() {
    return this.props.href[0] === '#';
  }

  get isExternal() {
    return isExternalURL(this.props.href);
  }

  get resolvedPath() {
    const { page, href } = this.props;
    if (this.isHash) {
      return path.resolve('/wiki/', page + href);
    } else {
      return path.resolve('/wiki/', href);
    }
  }

  render() {
    const { href, children, match: { params: { page } } } = this.props;

    if (this.isHash) {
      return <HashLink to={this.resolvedPath}>{children}</HashLink>;
    } else {
      return (
        <Link
          target={this.isExternal ? '_blank' : ''}
          to={this.isExternal ? href : this.resolvedPath}>
          {children}
        </Link>
      );
    }
  }
}

const withPrefetch = connect(undefined, { prefetchPage });
const enhance = compose(withRouter, withPrefetch);

export default enhance(WikiLink);
