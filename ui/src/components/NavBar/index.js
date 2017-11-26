import React, { Component } from 'react';
import { Flex, Box } from 'reflexbox';
import hideWhenZen from 'util/hideWhenZen';
import Search from 'components/Search';
import { colors } from 'style';
import {
  Home as HomeIcon,
  Map as MapIcon,
  Settings as SettingsIcon,
} from 'react-feather';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

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

const Folder = styled(MapIcon)`
  stroke: ${colors.gray2};
  fill: ${colors.gray1};

  &:hover {
    cursor: pointer;
    stroke: white;
  }
`;

const Home = styled(HomeIcon)`
  stroke: ${colors.gray2};
  fill: ${colors.gray1};

  &:hover {
    cursor: pointer;
    stroke: white;
  }
`;

class NavBar extends Component {
  state = { search: '' };

  handleSettings = () => this.props.history.push(`/wiki/settings`);
  handleDirectory = () => this.props.history.push(`/wiki/explore`);
  handleHome = () => this.props.history.push('/wiki');
  updateSearch = e => this.setState({ search: e.target.value });
  handleEnter = e => {
    if (e.keyCode === 13) {
      this.props.history.push(`/search?query=${this.state.search}`);
    }
  };

  render() {
    return (
      <Container>
        <Box p={2}>
          <Home onClick={this.handleHome} />
        </Box>

        <Flex ml="auto">
          <Flex justify="center" align="center" mr={2}>
            <Search
              onChange={this.updateSearch}
              onKeyDown={this.handleEnter}
              placeholder="Search Wiki..."
            />
            <Box ml={2}>
              <Folder onClick={this.handleDirectory} />
            </Box>
            <Box ml={2}>
              <Settings onClick={this.handleSettings} />
            </Box>
          </Flex>
        </Flex>
      </Container>
    );
  }
}

export default hideWhenZen(withRouter(NavBar));
