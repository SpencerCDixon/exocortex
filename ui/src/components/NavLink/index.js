import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { Box } from 'reflexbox';
import { colors } from 'style';
import styled from 'styled-components';

const activeClassName = 'nav-item-active';

const StyledNavItem = styled(RouterNavLink).attrs({
  activeClassName,
})`
  text-decoration: none;
  color: ${colors.gray2};

  &:hover {
    color: white;
  }
  &.${activeClassName} {
    // color: white;
  }
`;

class NavLink extends Component {
  static propTypes = {
    to: PropTypes.string,
  };

  render() {
    const { children, to } = this.props;

    return (
      <Box p={2}>
        <StyledNavItem activeClassName={activeClassName} to={to}>
          {children}
        </StyledNavItem>
      </Box>
    );
  }
}

export default NavLink;
