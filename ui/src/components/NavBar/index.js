import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'reflexbox';
import NavLink from 'components/NavLink';
import Search from 'components/Search';

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
          <Flex justify="center" align="center" mr={2}>
            <Search placeholder="Search Wiki..." />
          </Flex>
        </Flex>
      </Flex>
    );
  }
}

export default NavBar;
