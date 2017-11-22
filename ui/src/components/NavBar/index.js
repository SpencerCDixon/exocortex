import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'reflexbox';
import NavLink from 'components/NavLink';
import Search from 'components/Search';
import { colors } from 'style';
import { Settings as SettingsIcon } from 'react-feather';
import styled from 'styled-components';

const Container = styled(Flex)`
  background: ${colors.gray1};
`;

const Settings = styled(SettingsIcon)`
  color: ${colors.gray2};
  transition: transform 0.8s ease-in-out;

  &:hover {
    color: white;
    cursor: pointer;
    transform: rotate(300deg);
  }
`;

class NavBar extends Component {
  render() {
    return (
      <Container>
        <NavLink to="/wiki">Home</NavLink>

        <Flex ml="auto">
          <Flex justify="center" align="center" mr={2}>
            <Search placeholder="Search Wiki..." />
            <Box ml={2}>
              <Settings />
            </Box>
          </Flex>
        </Flex>
      </Container>
    );
  }
}

export default NavBar;
