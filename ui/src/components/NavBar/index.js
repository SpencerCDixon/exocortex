import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'reflexbox';
import NavLink from 'components/NavLink';

const style = {
  container: {
    background: '#1C2022',
  },
  link: {
    color: 'white',
  },
};

class NavBar extends Component {
  render() {
    return (
      <Flex style={style.container}>
        <NavLink to="/wiki">Home</NavLink>

        <Flex ml="auto">
          <NavLink to="/wiki/home">Page</NavLink>
          <NavLink to="/wiki/home">Page 2</NavLink>
          <NavLink to="/wiki/home">Page 3</NavLink>
        </Flex>
      </Flex>
    );
  }
}

export default NavBar;
