import React, { Component } from 'react';
import { X, HelpCircle } from 'react-feather';
import { Flex, Box } from 'reflexbox';
import { Wrapper, Circle, Helper, Hotkey, Subheader } from './styles';

class HotkeyHelp extends Component {
  state = { open: false };

  toggle = () => this.setState({ open: !this.state.open });

  render() {
    return (
      <Wrapper>
        <Helper open={this.state.open}>
          <Subheader>When Editing...</Subheader>
          <Flex>
            <Box>
              <Hotkey>⌘ P</Hotkey>
            </Box>
            <Box>Preview Mode</Box>
          </Flex>
          <Flex my={1}>
            <Box>
              <Hotkey>⌘ S</Hotkey>
            </Box>
            <Box>Save Document</Box>
          </Flex>
          <Flex my={1} mb={2}>
            <Box>
              <Hotkey>⌘ Z</Hotkey>
            </Box>
            <Box>Zen Mode</Box>
          </Flex>

          <Subheader>When Viewing...</Subheader>
          <Flex>
            <Box>
              <Hotkey>⌘ I</Hotkey>
            </Box>
            <Box>Insert Mode</Box>
          </Flex>
          <Flex my={1}>
            <Box>
              <Hotkey>⌘ E</Hotkey>
            </Box>
            <Box>Edit Mode</Box>
          </Flex>
        </Helper>

        <Circle onClick={this.toggle}>
          {this.state.open ? <X color="white" /> : <HelpCircle color="white" />}
        </Circle>
      </Wrapper>
    );
  }
}

export default HotkeyHelp;
