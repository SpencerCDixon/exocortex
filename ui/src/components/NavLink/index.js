import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Box } from 'reflexbox';

const style = {
  color: 'white',
  textDecoration: 'none',
};

class NavLink extends Component {
  static propTypes = {
    to: PropTypes.string,
  }

  render() {
    const { children, to } = this.props;

    return (
      <Box p={2}>
        <Link style={style} to={to}>
          {children}
        </Link>
      </Box>
    );
  }
}

export default NavLink;
