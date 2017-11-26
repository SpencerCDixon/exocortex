import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hideWhenZen from 'util/hideWhenZen';
import { X, HelpCircle } from 'react-feather';
import { Flex, Box } from 'reflexbox';
import { Wrapper, Circle, Helper, Hotkey, Subheader } from './styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { toggleHelp, getIsHelpOn } from 'store/modules/hotKeys';
import { createStructuredSelector } from 'reselect';

class HotkeyHelp extends Component {
  static propTypes = {
    isHelpOn: PropTypes.bool.isRequired,
    toggleHelp: PropTypes.func.isRequired,
  };

  render() {
    const { isHelpOn, toggleHelp } = this.props;

    return (
      <Wrapper>
        <Helper open={isHelpOn}>
          <Subheader>When Editing...</Subheader>
          <Flex>
            <Box>
              <Hotkey>⌘ P</Hotkey>
            </Box>
            <Box>Preview Mode</Box>
          </Flex>
          <Flex my={1} mb={2}>
            <Box>
              <Hotkey>⌘ S</Hotkey>
            </Box>
            <Box>Save Document</Box>
          </Flex>

          <Subheader>When Viewing...</Subheader>
          <Flex>
            <Box>
              <Hotkey>⌘ I</Hotkey>
            </Box>
            <Box>Insert Mode</Box>
          </Flex>
          <Flex my={1} mb={2}>
            <Box>
              <Hotkey>⌘ E</Hotkey>
            </Box>
            <Box>Edit Mode</Box>
          </Flex>

          <Subheader>Whenever</Subheader>
          <Flex my={1}>
            <Box>
              <Hotkey>⌘ Z</Hotkey>
            </Box>
            <Box>Zen Mode</Box>
          </Flex>
          <Flex my={1}>
            <Box>
              <Hotkey>⌘ ?</Hotkey>
            </Box>
            <Box>Toggle Help</Box>
          </Flex>
        </Helper>

        <Circle onClick={toggleHelp}>
          {isHelpOn ? <X color="white" /> : <HelpCircle color="white" />}
        </Circle>
      </Wrapper>
    );
  }
}

const withHelp = connect(createStructuredSelector({ isHelpOn: getIsHelpOn }), {
  toggleHelp,
});
const enhance = compose(hideWhenZen, withHelp);

export default enhance(HotkeyHelp);
